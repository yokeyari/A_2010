class Api::V1::UsersController < ApplicationController
  before_action :current_user, except: [:index, :create, :username_search]
  before_action :set_bug_bug_bug

  def index
    res_ok User.all, inc: {} 
  end

  def show
    res_ok @user, inc: {workspaces: :workspace, pages: [:tags, :memos]}
  end

  def create
    user = User.create!(params.permit(:name, :email, :password, :password_confirmation, :username))
    reset_session
    session[:user_id] = user.id
    res_ok user, inc: {} # 作成時は空っぽ
  end

  def update
    if @user.update(params.permit(:name, :email, :username))
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

  def username_search
    res_ok User.where("username LIKE :prefix", prefix: "#{params[:username]}%"), inc: {}
  end
end
