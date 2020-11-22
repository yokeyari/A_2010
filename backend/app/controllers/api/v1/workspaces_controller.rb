class Api::V1::WorkspacesController < ApplicationController
  before_action :current_user
  before_action :find_workspace, except: [:index, :create]

  def index
    res_ok @user, inc: {workspaces: [:workspace]}
  end

  def show
    res_ok @wspace, inc: {users: [:user]}
  end

  # ownerはparamsに含まれるかどうか？
  def create
    wspace = nil
    ActiveRecord::Base.transaction do 
      wspace = Workspace.create!(params.permit(:name))
      wspace_id = wspace.id

      Rel_UAW.create!(user_id: @user.id, workspace_id: wspace_id, permission: :owner)

      params[:users].each do |user_id, perm| 
        raise if perm == 'owner'
        Rel_UAW.create!(user_id: user_id, workspace_id: wspace_id, permission: perm)
      end
    end

    res_ok wspace, inc: {users: [:user]}
  rescue ActiveRecord::RecordInvalid => e
    res_errors e.record
  rescue 
    res_bad_request
  end

  def update
    ActiveRecord::Base.transaction do
      @wspace.update!(name: params[:name]) if params[:name]
      wspace_id = @wspace.id

      params[:users].each do |user_id, perm| 
        rel = Rel_UAW.find_by(user_id: user_id, workspace_id: wspace_id)
        raise ActiveRecord::RecordNotFound if rel.nil? # 無い場合は例外処理
        raise if perm == 'owner' || rel.permission == 'owner'
        rel.update!(permission: perm)
      end
    end

    res_ok @wspace, inc: {users: [:user]}
  rescue ActiveRecord::RecordNotFound
    res_not_found
  rescue ActiveRecord::RecordInvalid => e
    res_errors e.record
  rescue
    res_bad_request
  end

  def destroy
    @wspace.destroy
    res_ok
  end

  def all_users
    res_ok @wspace.rel_uaws, inc: [:user]
  end

  def all_pages
    res_ok @wspace.pages, inc: [:tags, :memos]
  end

  # sessionの人がWSに参加
  def join
    raise if params[:perm] == 'owner'
    rel.create!(user_id: @user.id, workspace_id: @wspace.id, permission: params[:perm])
    res_ok @wspace, inc: {users: [:user]}
  rescue ActiveRecord::RecordInvalid => e
    res_errors e.record
  rescue
    res_bad_request
  end

  def join_users
    # 1つでも追加できなければ巻き戻って例外発生
    Rel_UAW.transaction do
      params[:users].each do |user_id, perm|
        raise if perm == 'owner'
        Rel_UAW.create!(user_id: user_id, workspace_id: @wspace.id, permission: perm)
      end
    end

    res_ok @wspace, inc: {users: [:user]}
  rescue ActiveRecord::RecordInvalid => e
    res_errors e.record
  rescue
    res_bad_request
  end

  def quit_users
    Rel_UAW.transaction do
      params[:user].each do |user_id|
        rel = Rel_UAW.find_by(user_id: user_id, workspace_id: @wspace.id)
        raise ActiveRecord::RecordNotFound if rel.nil?
        rel.destroy
      end
    end

    res_ok 
  rescue ActiveRecord::RecordNotFound
    res_not_found
  end

  def change_owner
    if @rel.permission != 'owner'
      res_bad_request
    else
      # 自分自信を指定した時例外
      user2 = User.find(params[:user_id])
      rel2 = join_ws?(user2, @wspace)
      raise ActiveRecord::RecordNotFound if rel2.nil?

      Rel_UAW.transaction do
        @rel.update!(permission: 'general')
        rel2.update!(permission: 'owner')
      end
      res_ok @wspace, inc: {users: [:user]}
    end
  rescue ActiveRecord::RecordNotFound
    res_not_found
  rescue ActiveRecord::RecordInvalid => e
    res_errors e.record
  end

  def reset_token
    @wspace.regenerate_token
    res_ok @wspace, inc: {}
  end

private
  def find_workspace
    @wspace = Workspace.find(params[:workspace_id])
    @rel = join_ws?(@user, @wspace)
    raise if @rel.nil?
  rescue ActiveRecord::RecordNotFound
    res_not_found 
  rescue
    res_forbidden
  end
end
