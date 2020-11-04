class Page < ApplicationRecord
  belongs_to :user
  has_many :memos, dependent: :destory
  has_many :tags, dependent: :destroy
  validates :url, presence: :true, format: {with: //}
  validates :title, presence: :true
end
