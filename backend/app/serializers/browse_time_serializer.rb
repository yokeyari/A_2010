class BrowseTimeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :page_id, :time, :total_play, :total_write_memo, :total_else
  # belongs_to :user
  # belongs_to :page
end
