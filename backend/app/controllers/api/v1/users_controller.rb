class Api::V1::UsersController < ApplicationController
  before_action :current_user, except: [:index, :create]

  def index
    res_ok User.all, inc: {}
  end

  def show
    res_ok @user, inc: {}
  end

  def create
    user = User.create!(params.permit(:name, :email, :password, :password_confirmation, :username))
    reset_session
    session[:user_id] = user.id
    res_ok user, inc: {} # 作成時は空っぽ
  rescue ActiveRecord::RecordInvalid => e
    res_errors e.record
  end

  def update
    if @user.update(params.permit(:name, :email, :username))
      res_ok @user, inc: {}
    else
      res_errors @user
    end
  end

  def destroy
    @user.destroy
    reset_session
    res_ok
  end
end
