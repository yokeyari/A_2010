class Page < ApplicationRecord
  belongs_to :user
  has_many :memos, dependent: :destroy
  has_many :tags, dependent: :destroy
  has_secure_token
  validates :url, presence: :true, format: {with: //}
  validates :title, presence: :true
end
