class Api::V1::UsersController < ApplicationController
  before_action :current_user, only: %i[show update destroy]
  before_action :set_bug_bug_bug

  def index
    res_ok User.all, inc: {} 
  end

  def show
    # @user = User.where(id: @user.id).preload(pages: [:tags, :memos], rel_user_and_workspaces: [:workspace]).first
    res_ok @user, inc: {workspaces: :workspace, pages: [:tags, :memos]}
  end

  def create
    @user = User.create!(params.permit(:name, :email, :password, :password_confirmation, :account_id))
    reset_session
    session[:user_id] = @user.id
    set_tukaikata
    res_ok @user, inc: {pages: [:memos, :tags]}
  end

  def update
    if @user.update(params.permit(:name, :email, :account_id))
      res_ok @user, inc: {workspaces: :workspace, pages: [:tags, :memos]}
    else
      res_errors @user
    end
  end

  def destroy
    @user.destroy
    reset_session
    res_ok
  end

  def account_search
    res_ok User.where("account_id LIKE :prefix", prefix: "#{params[:account_id]}%"), inc: {}
  end
end
