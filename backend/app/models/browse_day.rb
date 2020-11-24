class BrowseDay < ApplicationRecord
  belongs_to :user
  belongs_to :page

  validates :day, presence: true, uniqueness: {scope: [:user_id, :page_id]}
end
