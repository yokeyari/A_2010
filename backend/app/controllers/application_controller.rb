require 'net/https'

class ApplicationController < ActionController::API
  include ActionController::Cookies
  include TypicalRes

  GOO_LAB_URL = "https://labs.goo.ne.jp/api/keyword"

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

  Rel_UAW = RelUserAndWorkspace
end
