class Tag < ApplicationRecord
  belongs_to :page
  validates :text, presence: true
end
