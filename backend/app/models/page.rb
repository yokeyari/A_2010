class Page < ApplicationRecord
  belongs_to :user
  has_many :memos
  has_many :tags
  validates :url, presence: :true, format: {with: //}
  validates :title, presence: :true
end
