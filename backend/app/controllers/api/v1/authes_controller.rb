require 'google/apis/oauth2_v2'

class Api::V1::AuthesController < ApplicationController
  def login
    oauth2 = Google::Apis::Oauth2V2::Oauth2Service.new
    tokeninfo = oauth2.tokeninfo(id_token: params[:id_token])
  rescue => e # tokeninfoの失敗例外
    render status: 400
  else
    google_user_id = tokeninfo.user_id
    user = User.where(provider: 'google').find_by(external_id: google_user_id) # 改善の余地あり
    
    # userが無い場合は新規作成
    if user.nil?
      user = User.create!(name: params[:user], provider: 'google', external_id: google_user_id)
    end

    session[:user] = user
    render json: {user: user}, status: :ok
  end

  def islogin
    if user = session[:user]
      render json: {user: user}, status: :ok
    else
      render status: :not_found
    end
  end

  def logout
    reset_session
    render status: :ok
  end
end
