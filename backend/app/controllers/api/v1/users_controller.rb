class Api::V1::UsersController < ApplicationController
  before_action :find_user, only: [:update, :destroy]

  def login
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id # セッションに記録
      p session[:user_id]
      render json: {user: user}, status: :ok
    else
      render status: :bad_request
    end
  end

  def logout
    session.delete(:user_id)
    render status: :ok
  end

  def logged_in?
    p session[:user_id]
    if current_user
      render json: {user: @current_user}, status: :ok
    else
      render body: "b", status: :unauthorized
    end
  end

  # ユーザーの作成
  def create
    begin
      user = User.create!(params.permit(:name, :email, :password, :password_confirmation))
      session[:user_id] = user.id
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
    session.delete(:user_id)
    render status: :ok
  end

  private
  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end
end
