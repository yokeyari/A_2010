class Api::V1::UsersController < ApplicationController
  before_action :find_user, only: [:show, :update, :destroy]

  # ユーザーが存在するか
  def login
    user = User.find_by(email: params[:email])
    if user.nil?
      render status: :not_found
    else
      render json: {user: user}, status: 200
    end
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
      user = User.create!(params.permit(:name, :email))
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
    render status: :ok
  end
end
