class BrowseTimeSerializer < ActiveModel::Serializer
  attributes :id, :time, :total_play, :total_write_memo, :total_else
  # belongs_to :user
  # belongs_to :page
end
