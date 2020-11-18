class Api::V1::TagsController < ApplicationController
  before_action :current_user
  before_action :find_page, only: [:index, :automate]
  before_action :find_tag, only: [:destroy, :update]

  # あるページのタグ一覧のjsonを返す
  def index
    render json: {tags: @page.tags}, status: :ok
  end
  
  # タグを作成する
  def create
    tag = Tag.create!(params.permit(:page_id, :text))
    render json: {tag: tag}, status: :ok
  rescue => e # 作成できない場合
    render json: {error: e.record.errors.full_messages}, status: :bad_request
  end

  # タグを削除する
  def destroy
    @tag.destroy
    render status: :ok
  end

  # 手動タグを更新する
  def update
    if @tag.is_automated # 自動タグを更新しようとした場合
      render status: :forbidden
    elsif @tag.update(params.permit(:text))
      render json: {tag: @tag}, status: :ok
    else
      render json: {error: @tag.errors.full_messages}, status: :bad_request
    end
  end

  # 自動タグを取得し、データベース中の自動タグを更新する
  def automate
    @page.tags.where(is_automated: true).destroy_all # 自動タグを全消去する
    keywords = tagging(@page)[0, 3]
    
    # 保存に失敗した時を想定していない
    tags = keywords.map {|keyword| Tag.create(page_id: params[:page_id], text: keyword, is_automated: true)}
    render json: {tags: tags}, status: :ok
  end

  private
  # page以下の全てのメモからキーワード抽出
  def tagging(page)
    all_memo_text = page.memos.map(&:text).join(' ')
    post_hash = {app_id: 0, title: page.title, body: all_memo_text}
    tags = JSON.parse(post_api(post_hash).body)['keywords']
    tags.map! {|tag| tag.keys[0]} # タグの整形
  end
end
