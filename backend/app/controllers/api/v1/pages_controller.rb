class Api::V1::PagesController < ApplicationController
  before_action :current_user, except: [:share]
  before_action :find_page, only: [:show, :update, :destroy, :reset_token]

  # メモページ一覧とメモ一覧を返す
  def index
    res_ok @user.pages, inc: [:tags, :memos]
  end

  def show
    res_ok @page, inc: [:tags, :memos]
  end

  def create
    page = Page.create!(params.permit(:user_id, :workspace_id, :url, :title))
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
    
    re = internal_search(pages, params[:keywords])
    res_ok re
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
    re = []
    pages.each do |page|
      a = page.memos.filter do |memo| 
        keywords.any? {|keyword| memo.text.include?(keyword)}
      end

      b = page.tags.filter do |tag|
        keywords.any? {|keyword| tag.text.include?(keyword)}
      end

      c = keywords.any? {|keyword| page.title.include?(keyword)}

      next if a.empty? && b.empty? && !c
      re << page.attributes.merge(memos: a, tags: page.tags)
    end
    re
  end
end
