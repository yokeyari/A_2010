class Api::V1::UsersController < ApplicationController
  #before_action :token_check, only: [:show]
  before_action :find_user, only: [:show, :update, :destroy]
=begin
  def login
    user = User.find_by(email: params[:email].downcase)
    if user.nil?
      render status: :bad_request
    elsif user.authenticate(params[:password])
      #session[:user_id] = user.id # セッションに記録
      render json: {user: user}, status: :ok
    else
      render status: :not_acceptable
    end
  end

  def logout
    #session.delete(:user_id)
    User.find(params[:user_id]).regenerate_token
    render status: :ok
  end
=end
  def index
    render json: {users: User.all}, status: :ok
  end

  def show
    render json: {user: @user}, status: :ok
  end

  def create
    user = User.create!(params.permit(:name, :email, :password, :password_confirmation))
    session[:user] = user
    render json: {user: user}, status: :ok
  rescue => e
    render json: {error: e.record.errors.full_messages}, status: :bad_request
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
    reset_session
    render status: :ok
  end
end
