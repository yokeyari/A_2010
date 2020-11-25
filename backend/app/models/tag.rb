class Tag < ApplicationRecord
  belongs_to :page
  validates :text, presence: true
  validates :is_automated, inclusion: {in: [true, false]}
end
