class Api::V1::PagesController < ApplicationController
  before_action :current_user, except: [:share]
  before_action :set_bug_bug_bug
  before_action :find_page, only: [:show, :update, :destroy, :reset_token]

  # メモページ一覧とメモ一覧を返す
  def index
    res_ok @user.pages, inc: [:tags, :memos]
  end

  def show
    res_ok @page, inc: [:tags, :memos]
  end

  def create
    page = Page.create!(params.permit(:workspace_id, :url, :title).merge(user_id: @user.id))
    res_ok page, inc: {} # まだ中身ないのでincしない
  end

  def update
    if @page.update(params.permit(:url, :title))
      res_ok @page, inc: [:tags, :memos]
    else
      res_errors @page
    end
  end

  def destroy
    @page.destroy
    res_ok
  end

  # キーワード検索
  def search
    if ws_id = params[:workspace_id]
      pages = Workspace.find(ws_id).pages
    else
      pages = @user.pages
    end

    keywords = params[:keywords]
    keywords.map! {|e| Regexp.new(e, Regexp::IGNORECASE)}

    search_result = internal_search(pages, keywords)
    render json: search_result, each_serializer: nil
  end

  # トークン再生成
  def reset_token
    @page.regenerate_token
    res_ok @page, inc: [:tags, :memos]
  end

  def share
    page = Page.find_by(token: params[:page_token])
    if page.nil?
      res_not_found
    else
      res_ok page, inc: [:tags, :memos]
    end
  end

private
  def find_page
    @page = Page.find(params[:page_id])
    raise MyForbidden unless @page.user_id == @user.id || join_ws?(@user, @page.workspace)
  end

  def internal_search(pages, keywords)
    search_result = []

    pages.each do |page|
      memos = page.memos.filter do |memo| 
        keywords.any? {|key| key.match?(memo.text)}
      end

      tag_bool = page.tags.any? do |tag|
        keywords.any? {|key| key.match?(tag.text)}
      end

      title_bool = keywords.any? {|key| key.match?(page.title)}

      next if memos.empty? && !tag_bool && !title_bool
      memos.map! {|memo| MemoSerializer.new(memo).as_json}
      search_result << SearchPageSerializer.new(page).as_json.merge(memos: memos)
    end

    search_result
  end
end
