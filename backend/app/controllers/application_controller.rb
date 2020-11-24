require 'net/https'

class ApplicationController < ActionController::API
  include ActionController::Cookies
  include TypicalRes

  GOO_LAB_URL = "https://labs.goo.ne.jp/api/keyword"
  WorkSpace = Workspace
  Rel_UAW = RelUserAndWorkspace

  # オリジナルエラー
  class MyForbidden < Exception; end
  class MyUnauthorized < Exception; end
  class MyOwnerChangeError < Exception; end

  # 例外処理
  rescue_from ActiveRecord::RecordNotFound, with: :res_not_found
  rescue_from ActiveRecord::RecordInvalid,  with: :res_errors_record
  rescue_from MyForbidden,                  with: :res_forbidden
  rescue_from MyUnauthorized,               with: :res_unauthorized
  rescue_from MyOwnerChangeError,           with: :res_bad_request
  # rescue_from ArgumentError,                with: :bad_request      # enumに無い物を指定すると発生

  # api に何かを投げつける
  def post_api(post_hash, url = GOO_LAB_URL)
    uri = URI.parse(url)
    req = Net::HTTP::Post.new(uri.request_uri, {'Content-Type' =>'application/json'})
    req.body = post_hash.to_json

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    http.request(req)
  end

  # bug 
  # おそらく render で serialize するときに before_action が呼ばれてしまう．onlyでも呼ばれる．なぜか.
  def current_user
    return if @bug_bug_bug
    @bug_bug_bug = 0
    @user ||= User.find(session[:user_id])
  rescue ActiveRecord::RecordNotFound # ユーザーが見つからない，またはsessionが保存されていない時
    render status: 600
  end

  def set_bug_bug_bug
    @bug_bug_bug = 0
  end

  def join_ws?(user, ws)
    user && ws && Rel_UAW.find_by(user_id: user.id, workspace_id: ws.id)
  end
end
