class BrowseTime < ApplicationRecord
  belongs_to :user
  belongs_to :page

  validates :time, presence: true, uniqueness: {scope: [:user_id, :page_id]}
end
