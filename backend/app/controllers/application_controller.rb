require 'net/https'

class ApplicationController < ActionController::API
  include ActionController::Cookies
  include TypicalRes

  GOO_LAB_URL = "https://labs.goo.ne.jp/api/keyword"
  Rel_UAW = RelUserAndWorkspace

  class MyForbidden < Exception; end
  class MyUnauthorized < Exception; end

  rescue_from ActiveRecord::RecordNotFound, with: :res_not_found
  rescue_from ActiveRecord::RecordInvalid,  with: :res_errors_record
  rescue_from MyForbidden,                  with: :res_forbidden
  rescue_from MyUnauthorized,               with: :res_unauthorized

  # api に何かを投げつける
  def post_api(post_hash, url = GOO_LAB_URL)
    uri = URI.parse(url)
    req = Net::HTTP::Post.new(uri.request_uri, {'Content-Type' =>'application/json'})
    req.body = post_hash.to_json

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    res = nil
    http.start {|h| res = h.request(req)}
    res
  end

  def current_user
    @user ||= User.find(session[:user_id])
  rescue ActiveRecord::RecordNotFound # ユーザーが見つからない，またはsessionが保存されていない時
    res_unauthorized
  end

  def join_ws?(user, ws)
    user && ws && Rel_UAW.find_by(user_id: user.id, workspace_id: ws.id)
  end
end
