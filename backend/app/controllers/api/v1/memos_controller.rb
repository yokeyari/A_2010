class Api::V1::MemosController < ApplicationController
  #before_action :logged_in?
  before_action :find_page, only: [:index]
  before_action :find_memo, only: [:update, :destroy]

  # あるメモページのメモ一覧のJSONを返す．
  def index
    render json: {memos: @page.memos}, status: :ok
  end

  # メモを作成する．
  def create
    memo = Memo.create!(params.permit(:user_id, :page_id, :parent_id, :text, :time))
    render json: {memo: memo}, status: :ok
  rescue => e # 作成できない場合
    render json: {error: e.record.errors.full_messages}, status: :bad_request
  end

  def update
    if @memo.update(params.permit(:text, :time))
      render json: {memo: @memo}, status: :ok
    else
      render json: {error: @memo.errors.full_messages}, status: :bad_request
    end
  end

  def destroy
    @memo.destroy
    render status: :ok
  end
end
