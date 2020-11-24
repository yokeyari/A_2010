class Api::V1::MemosController < ApplicationController
  before_action :current_user
  before_action :find_memo, only: [:update, :destroy]

  # あるメモページのメモ一覧のJSONを返す．
  def index
    res_ok Memo.where(params.permit(:page_id))
  end

  # メモを作成する．
  def create
    memo = Memo.create!(params.permit(:user_id, :page_id, :parent_id, :text, :time, :status))
    res_ok memo
  end

  def update
    if @memo.update(params.permit(:text, :time, :status))
      res_ok @memo
    else
      res_errors @memo
    end
  end

  def destroy
    @memo.destroy
    res_ok
  end

private
  def find_memo
    @memo = Memo.find(params[:memo_id])
  end
end
