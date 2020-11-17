require 'google/apis/oauth2_v2'

class Api::V1::AuthesController < ApplicationController
  before_action :current_user, only: [:islogin]

  GoogleApis = Google::Apis

  # 独自のログイン
  def login
    user = User.find_by(email: params[:email].downcase)
    if user.nil? # ユーザーがいない
      render json: {email: false}, status: :not_found
    elsif user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: {user: user}, status: :ok
    else # パスワードが違う
      render json: {password: false}, status: :unauthorized
    end
  end

  # googleでのログイン
  def login_google
    tokeninfo = GoogleApis::Oauth2V2::Oauth2Service.new.tokeninfo(id_token: params[:id_token])
    google_user_id = tokeninfo.user_id
    user = User.where(provider: 'google').find_by(external_id: google_user_id) # 改善の余地あり
    
    # userが無い場合は新規作成
    user ||= User.create!(name: params[:name], provider: 'google', external_id: google_user_id)

    session[:user_id] = user.id
    render json: {user: user}, status: :ok
  rescue GoogleApis::ServerError => e # tokeninfoの失敗例外，リトライ推奨
    render status: :bad_request
  rescue GoogleApis::ClientError => e # tokeninfoの失敗例外，リトライ非推奨，バグの存在？
    render status: :bad_request
  rescue GoogleApis::AuthorizationError => e # tokeninfoの失敗例外，権限が無い（？）
    render status: :bad_request
  rescue ActiveRecord::RecordInvalid => e # createの失敗例外
    render status: :bad_request
  end

  def islogin
    render json: {user: @user}, status: :ok
  end

  def logout
    reset_session
    render status: :ok
  end
end
