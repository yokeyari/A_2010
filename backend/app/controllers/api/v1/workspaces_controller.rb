class Api::V1::WorkspacesController < ApplicationController
  before_action :current_user
  before_action :find_workspace, except: [:index, :create, :join, :token]

  def index
    res_ok @user, inc: {workspaces: [:workspace]}
  end

  def show
    res_ok @wspace, inc: {users: :user, pages: [:tags, :memos]}
  end

  def create
    wspace = nil

    ActiveRecord::Base.transaction do 
      wspace = Workspace.create!(params.permit(:name))
      wspace_id = wspace.id

      Rel_UAW.create!(user_id: @user.id, workspace_id: wspace_id, permission: :owner)

      params[:users].each do |user_id, perm| 
        raise MyOwnerChangeError if perm == 'owner'
        Rel_UAW.create!(user_id: user_id, workspace_id: wspace_id, permission: perm)
      end
    end

    res_ok wspace, inc: {users: :user, pages: [:tags, :memos]}
  end

  def update
    ActiveRecord::Base.transaction do
      @wspace.update!(name: params[:name]) if params[:name]
      wspace_id = @wspace.id

      params[:users].each do |user_id, perm| 
        rel = Rel_UAW.find_by(user_id: user_id, workspace_id: wspace_id)
        raise ActiveRecord::RecordNotFound if rel.nil? # 無い場合は例外処理
        raise MyOwnerChangeError if perm == 'owner' || rel.permission == 'owner'
        rel.update!(permission: perm)
      end
    end

    res_ok @wspace, inc: {users: :user, pages: [:tags, :memos]}
  end

  def destroy
    @wspace.destroy
    res_ok
  end

  def all_users
    res_ok @wspace.rel_uaws, inc: :user
  end

  def all_pages
    render json: @wspace.pages, include: [:tags, :memos], each_serializer: FewMemoPageSerializer
  end

  # sessionの人がWSに参加
  def join
    wspace = Workspace.find(params[:workspace_id])
    raise MyOwnerChangeError if params[:perm] == 'owner'
    Rel_UAW.create!(user_id: @user.id, workspace_id: wspace.id, permission: params[:perm])
    res_ok wspace, inc: {users: :user, pages: [:tags, :memos]}
  end

  def join_users
    # 1つでも追加できなければ巻き戻って例外発生
    Rel_UAW.transaction do
      params[:users].each do |user_id, perm|
        raise MyOwnerChangeError if perm == 'owner'
        Rel_UAW.create!(user_id: user_id, workspace_id: @wspace.id, permission: perm)
      end
    end

    res_ok @wspace, inc: {users: :user, pages: [:tags, :memos]}
  end

  def quit
    raise MyOwnerChangeError if @rel.permission == 'owner'
    @rel.destroy!
    res_ok
  end

  def quit_users
    Rel_UAW.transaction do
      params[:users].each do |user_id|
        rel = Rel_UAW.find_by(user_id: user_id, workspace_id: @wspace.id)
        raise ActiveRecord::RecordNotFound if rel.nil?
        raise MyOwnerChangeError if rel.permission == 'owner'
        rel.destroy!
      end
    end

    res_ok @wspace, inc: {users: :user, pages: [:tags, :memos]}
  end

  def change_owner
    if @rel.permission != 'owner' || @user.id == params[:user_id]
      res_bad_request
    else
      user2 = User.find(params[:user_id])
      rel2 = join_ws?(user2, @wspace)
      raise MyOwnerChangeError if rel2.nil?

      Rel_UAW.transaction do
        @rel.update!(permission: 'sup')
        rel2.update!(permission: 'owner')
      end
      res_ok @wspace, inc: {users: :user, pages: [:tags, :memos]}
    end
  end

  def reset_token
    @wspace.regenerate_token
    res_ok @wspace, inc: {users: :user, pages: [:tags, :memos]}
  end

  def token
    wspace = Workspace.find_by(token: params[:workspace_token])
    if wspace.nil?
      res_not_found
    else
      res_ok wspace, inc: {}
    end
  end

private
  def find_workspace
    @wspace = Workspace.find(params[:workspace_id])
    @rel = join_ws?(@user, @wspace)
    raise MyForbidden if @rel.nil?
  end
end
