class Memo < ApplicationRecord
  belongs_to :page
  belongs_to :user
  validates :text, presence: :true, length: {maximum: 100}
  validates :time, presence: :true
  enum status: {pli: 0, pub: 1}
end
