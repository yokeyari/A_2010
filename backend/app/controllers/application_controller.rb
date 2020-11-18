require 'net/https'

class ApplicationController < ActionController::API
  include ActionController::Cookies
  include Res

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
  rescue ActiveRecord::RecordNotFound => e # ユーザーが見つからない，またはsessionが保存されていない時
    res_not_found session: !session[:user_id].nil?
  end

  Rel_UAW = RelUserAndWorkspace

  def permission_check

  end

=begin
  # トークンがユーザーのと一致するか．一致しない場合 render
  def token_check
    @user = User.find params[:user_id]
    if params[:user_token].nil? || @user.token != params[:user_token]
      render status: :unauthorized 
    end
  end
=end
end
