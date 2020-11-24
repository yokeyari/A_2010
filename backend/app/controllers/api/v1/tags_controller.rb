class Api::V1::TagsController < ApplicationController
  before_action :current_user
  before_action :find_tag, only: [:destroy, :update]

  # あるページのタグ一覧のjsonを返す
  def index
    res_ok Tag.where(params.permit(:page_id))
  end
  
  # タグを作成する
  def create
    tag = Tag.create!(params.permit(:page_id, :text))
    res_ok tag
  end

  # タグを削除する
  def destroy
    @tag.destroy
    res_ok
  end

  # 手動タグを更新する
  def update
    if @tag.is_automated # 自動タグを更新しようとした場合
      res_forbidden
    elsif @tag.update(params.permit(:text))
      res_ok @tag
    else
      res_errors @tag
    end
  end

  # 自動タグを取得し、データベース中の自動タグを更新する
  def automate
    page = Page.find(params[:page_id])

    tags = []
    Tag.transaction do
      page.tags.where(is_automated: true).destroy_all # 自動タグを全消去する
      keywords = tagging(page)[0, 3]
      tags = keywords.map {|keyword| Tag.create!(page_id: page.id, text: keyword, is_automated: true)}
    end
    
    res_ok tags
  end

private
  # page以下の全てのメモからキーワード抽出
  def tagging(page)
    all_memo_text = page.memos.map(&:text).join(' ')
    post_hash = {app_id: 0, title: page.title, body: all_memo_text}
    tags = JSON.parse(post_api(post_hash).body)['keywords']
    tags.map! {|tag| tag.keys[0]} # タグの整形
  end
  
  def find_tag
    @tag = Tag.find(params[:tag_id])
  end
end
