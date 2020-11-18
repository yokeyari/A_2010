class Api::V1::WorkspacesController < ApplicationController
  before_action :current_user
  before_action :find_workspace, except: [:index, :create]

  def index
    render json: {workspaces: @user.rel_uaws.map {|rel| rel.workspace.attributes.merge(permission: rel.permission)}}, status: :ok
  end

  def show
    rel = Rel_UAW.find_by(user_id: @user.id, workspace_id: @wsapce.id)
    if rel.nil?
      render json: {rel: false}, status: :bad_request
    else
      render json: {workspace: @wspace.attributes.merge(permission: rel.permission)}, status: :ok
    end
  end
  
  def create
    wspace = Workspace.create!(name: params[:name])
    Rel_UAW.create!(user_id: @user.id, workspace_id: wspace.id, permission: :owner)
    render json: {workspace: wspace}, status: :ok
  rescue ActiveRecord::RecordInvalid => e # 作成失敗
    render json: {errors: e.record.errors.messages}, status: :bad_request
  end

  def update
    if @wspace.update(name: params[:name])
      render json: {workspace: @wspace}, status: :ok
    else
      render json: {errors: @wspace.errors.messages}, status: :bad_request
    end
  end

  def delete 
    @wspace.destroy
    render status: :ok
  end

  def all_users
    render json: {users: @wsapce.rel_uaws.map(&:user)}, status: :ok
  end

  def all_pages
    render json: {pages: @wsapce.pages}, status: :ok
  end

  def add_user
    h = {user_id: @user.id, workspace_id: @wspace.id}
    rel = Rel_UAW.find_by(h)

    # まだ入っていない時，入らせる
    rel ||= Rel_UAW.create!(h)
    render json: {workspace: @wspace}, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors.messages}, status: :bad_request
  end

  def add_users
    Rel_UAW.transaction do
      params[:user_ids].each do |user_id|
        Rel_UAW.create!(user_id: user_id, workspace_id: @wspace.id)
      end
    end
    render json: {workspace: @wspace}, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors.messages}, status: :bad_request
  end

private
  def find_workspace
    @wspace = Workspace.find(params[:workspace_id])
  rescue ActiveRecord::RecordNotFound => e
    render json: {workspace_id: false}, status: :not_found
  end
end
