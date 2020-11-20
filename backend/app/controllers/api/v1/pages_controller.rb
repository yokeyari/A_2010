class Api::V1::PagesController < ApplicationController
  before_action :current_user
  before_action :find_page, only: [:show, :update, :destroy, :reset_token]

  # メモページ一覧とメモ一覧を返す
  def index
    res_ok @user.pages, inc: [:tags, :memos]
    # res_ok @user, inc: {pages: [:tags, :memos]} # ユーザー情報も入れる場合
  end

  def show
    res_ok @page, inc: [:tags, :memos]
  end

  def create
    page = Page.create!(params.permit(:user_id, :workspace_id, :url, :title))
    res_ok page, inc: {} # まだ中身ないのでincしない
  rescue ActiveRecord::RecordInvalid => e
    res_errors e.record
  end

  def update
    if @page.update(params.permit(:url, :title))
      res_ok @page, inc: {}
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
    keywords = params[:keywords]

    re = []
    @user.pages.each do |page|
      a = page.memos.filter do |memo| 
        keywords.any? {|keyword| memo.text.include?(keyword)}
      end

      b = page.tags.filter do |tag|
        keywords.any? {|keyword| tag.text.include?(keyword)}
      end

      c = keywords.any? {|keyword| page.title.include?(keyword)}

      next if a.empty? && b.empty? && !c
      re << page.attributes.merge(memos: a, tags: b)
    end

    res_ok re
  end

  # トークン再生成
  def reset_token
    @page.regenerate_token
    res_ok @page, inc: {}
  end

private
  def find_page
    @page = Page.find(params[:page_id])
  rescue ActiveRecord::RecordNotFound => e
    res_not_found
  end
end
