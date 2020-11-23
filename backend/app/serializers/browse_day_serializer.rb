class BrowseDaySerializer < ActiveModel::Serializer
  attributes :id, :day, :total_play, :total_write_memo, :total_else
  # belongs_to :user
  # belongs_to :page
end
