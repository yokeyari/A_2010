require 'net/https'

class ApplicationController < ActionController::API
  def find_user
    @user = User.find(params[:user_id])
  end

  def find_page
    @page = Page.find(params[:page_id])
  end

  def find_memo
    @memo = Memo.find(params[:memo_id])
  end

  def find_tag
    @tag = Tag.find(params[:tag_id])
  end

  GOO_LAB_URL = "https://labs.goo.ne.jp/api/keyword"

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
    @current_user ||= User.find_by(id: cookies[:user_id])
  end

  def logged_in?
    render status: :unauthorized if current_user.nil?
  end
end
