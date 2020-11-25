require 'google/apis/oauth2_v2'

class Api::V1::AuthesController < ApplicationController
  before_action :current_user, only: [:islogin]
  before_action :set_bug_bug_bug

  GoogleApis = Google::Apis

  # 独自のログイン
  def login
    user = User.find_by(email: params[:email].downcase)
    if user.nil? # ユーザーがいない
      res_not_found
    elsif user.authenticate(params[:password])
      reset_session
      session[:user_id] = user.id
      res_ok user, inc: {workspaces: :workspace, pages: [:tags, :memos]}
    else # パスワードが違う
      res_unauthorized
    end
  end

  # googleでのログイン
  def login_google
    tokeninfo = GoogleApis::Oauth2V2::Oauth2Service.new.tokeninfo(id_token: params[:id_token])
    google_user_id = tokeninfo.user_id
    google_email = /\A.*@/.match(tokeninfo.email)[0][0 .. -2]
    google_account_id = google_email + google_user_id

    user = User.find_or_create_by!(provider: 'google', external_id: google_user_id) do |u|
      u.name = params[:name]
      u.account_id = google_account_id
    end

    reset_session
    session[:user_id] = user.id
    res_ok user, inc: {workspaces: :workspace, pages: [:tags, :memos]}
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
    res_ok @user, inc: {workspaces: :workspace, pages: [:tags, :memos]}
  end

  def logout
    reset_session
    res_ok
  end
end
