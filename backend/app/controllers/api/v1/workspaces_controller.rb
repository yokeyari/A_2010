class Api::V1::WorkspacesController < ApplicationController
  before_action :current_user
  before_action :find_workspace, except: [:index, :create]

  def index
    res_ok @user, inc: {workspaces: [:workspace]}
  end

  def show
    rel = Rel_UAW.find_by(user_id: @user.id, workspace_id: @wspace.id)
    if rel.nil?
      res_forbidden
    else
      res_ok @wspace, inc: {users: [:user]}
    end
  end

  # ownerはparamsに含まれるかどうか？
  def create
    wspace = nil
    ActiveRecord::Base.transaction do 
      wspace = Workspace.create!(params.permit(:name))
      wspace_id = wspace.id

      params[:users].each {|user_id, perm| Rel_UAW.create!(user_id: user_id, workspace_id: wspace_id, permission: perm)}
    end

    res_ok wspace, inc: {users: [:user]}
  rescue ActiveRecord::RecordInvalid => e
    res_errors e.record
  end

  def update
    ActiveRecord::Base.transaction do
      @wspace.update!(name: params[:name]) if params[:name]
      wspace_id = @wspace.id

      params[:users].each do |user_id, perm| 
        rel = Rel_UAW.find_by(user_id: user_id, workspace_id: wspace_id)
        raise ActiveRecord::RecordNotFound if rel.nil? # 無い場合は例外処理
        rel.update!(permission: perm)
      end
    end

    res_ok @wspace, inc: {users: [:user]}
  rescue ActiveRecord::RecordNotFound
    res_not_found
  rescue ActiveRecord::RecordInvalid => e
    res_errors e.record
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

  def join_users
    # 1つでも追加できなければ巻き戻って例外発生
    Rel_UAW.transaction do
      params[:users].each do |user_id, perm|
        Rel_UAW.create!(user_id: user_id, workspace_id: @wspace.id, permission: perm)
      end
    end

    res_ok @wspace, inc: {users: [:user]}
  rescue ActiveRecord::RecordInvalid => e
    res_errors e.record
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

private
  def find_workspace
    @wspace = Workspace.find(params[:workspace_id])
  rescue ActiveRecord::RecordNotFound => e
    res_not_found 
  end
end
