class Api::V1::UsersController < ApplicationController
  before_action :current_user, except: [:index, :create]
  before_action :find_user, only: [:show, :update, :destroy]

  def index
    render json: {users: User.all}, status: :ok
  end

  def show
    render json: {user: @user}, status: :ok
  end

  def create
    user = User.create!(params.permit(:name, :email, :password, :password_confirmation))
    session[:user_id] = user.id
    render json: {user: user}, status: :ok
  rescue => e
    render json: {error: e.record.errors.full_messages}, status: :bad_request
  end

  def update
    if @user.update(params.permit(:name, :email))
      render json: {user: @user}, status: :ok
    else
      render json: {error: @user.errors.full_messages}, status: :bad_request
    end
  end

  def destroy
    @user.destroy
    reset_session
    render status: :ok
  end
end
