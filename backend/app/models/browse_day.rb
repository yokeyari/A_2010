class BrowseDay < ApplicationRecord
  belongs_to :user
  belongs_to :page

  validates :day, presence: true, uniqueness: {scope: [:user_id, :page_id]}
  validates :total_play, presence: true
  validates :total_write_memo, presence: true
  validates :total_else, presence: true
end
