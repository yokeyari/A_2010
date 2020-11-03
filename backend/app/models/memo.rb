class Memo < ApplicationRecord
  belongs_to :page
  validates :text, presence: :true, length: {maximum: 100}
  validates :time, presence: :true
end
