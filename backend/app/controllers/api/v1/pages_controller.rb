class Api::V1::PagesController < ApplicationController
  #before_action :logged_in?
  before_action :find_user, only: [:index, :search]
  before_action :find_page, only: [:show, :update, :destroy, :reset_token]

  # メモページ一覧とメモ一覧を返す
  def index
    # メモは最初の2つだけ返す
    pages_list = @user.pages.map {|page| page.attributes.merge(tags: page.tags, memos: page.memos[0,2])}
    render json: {pages: pages_list}, status: :ok
  end

  # 1つのページの表示
  def show
    render json: {page: @page, tags: @page.tags}, status: :ok
  end

  # 新しいpageの作成
  def create
    begin
      page = Page.create!(params.permit(:user_id, :url, :title))
      render json: {page: page}, status: :ok
    rescue => e
      render json: {error: e.record.errors.full_messages}, status: :bad_request
    end
  end

  # ページの更新
  def update
    if @page.update(params.permit(:url, :title))
      render json: {page: @page}, status: :ok
    else
      render json: {error: @page.errors.full_messages}, status: :bad_request
    end
  end

  # ページ削除
  def destroy
    @page.destroy
    render status: :ok
  end

  # キーワード検索
  def search
    keywords = params[:keywords] 
    re = []
    @user.pages.each do |page|
      a = page.memos.filter do |memo| 
        keywords.any? {|keyword| memo.text.include?(keyword)}
      end
      next if a.empty?
      re << page.attributes.merge(memos: a)
    end
    render json: {pages: re}, status: :ok
  end

  # トークン再生性
  def reset_token
    @page.regenerate_token
    render json: {page: @page} ,status: :ok
  end
end
