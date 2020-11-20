require 'google/apis/oauth2_v2'

class Api::V1::AuthesController < ApplicationController
  before_action :current_user, only: [:islogin]

  GoogleApis = Google::Apis

  # 独自のログイン
  def login
    user = User.find_by(email: params[:email].downcase)
    if user.nil? # ユーザーがいない
      res_not_found
    elsif user.authenticate(params[:password])
      session[:user_id] = user.id
      res_ok user, inc: {}
    else # パスワードが違う
      res_unauthorized
    end
  end

  # googleでのログイン
  def login_google
    tokeninfo = GoogleApis::Oauth2V2::Oauth2Service.new.tokeninfo(id_token: params[:id_token])
    google_user_id = tokeninfo.user_id
    user = User.find_by(provider: 'google', external_id: google_user_id)
    
    # userが無い場合は新規作成
    user ||= User.create!(name: params[:name], provider: 'google', external_id: google_user_id)

    session[:user_id] = user.id
    res_ok user, inc: {}
  rescue GoogleApis::ServerError => e # tokeninfoの失敗例外，リトライ推奨
    res_bad_request
  rescue GoogleApis::ClientError => e # tokeninfoの失敗例外，リトライ非推奨，バグの存在？
    res_bad_request
  rescue GoogleApis::AuthorizationError => e # tokeninfoの失敗例外，権限が無い（？）
    res_bad_request
  rescue ActiveRecord::RecordInvalid => e # createの失敗例外
    res_errors e.record
  end

  def islogin
    res_ok @user, inc: {}
  end

  def logout
    reset_session
    res_ok
  end
end
