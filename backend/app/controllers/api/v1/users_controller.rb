class Api::V1::UsersController < ApplicationController
  before_action :logged_in?, except: [:login, :create]
  before_action :find_user, only: [:show, :update, :destroy]

  def login
    user = User.find_by(email: params[:email].downcase)
    if user.nil?
      render status: :bad_request
    elsif user.authenticate(params[:password])
      cookies[:user_id] = user.id # セッションに記録
      render json: {user: user}, status: :ok
    else
      render status: :not_acceptable
    end
  end

  def logout
    cookies.delete(:user_id)
    render status: :ok
  end

  # ユーザー1覧
  def index
    render json: {users: User.all}, status: :ok
  end

  def show
    render json: {user: @user}, status: :ok
  end

  # ユーザーの作成
  def create
    begin
      user = User.create!(params.permit(:name, :email, :password, :password_confirmation))
      cookies[:user_id] = user.id
      render json: {user: user}, status: :ok
    rescue => e
      render json: {error: e.record.errors.full_messages}, status: :bad_request
    end
  end

  # ユーザーのupdate
  def update
    if @user.update(params.permit(:name, :email))
      render json: {user: @user}, status: :ok
    else
      render json: {error: @user.errors.full_messages}, status: :bad_request
    end
  end

  # ユーザーの削除
  def destroy
    @user.destroy
    cookies.delete(:user_id)
    render status: :ok
  end
end
