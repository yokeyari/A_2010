class MemoSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :page_id, :parent_id, :text, :time, :status, :account_id
  # belongs_to :user
  # belongs_to :page
end
