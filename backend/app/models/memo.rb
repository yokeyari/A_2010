class Memo < ApplicationRecord
  belongs_to :page
  belongs_to :user
  validates :text, presence: :true, length: {maximum: 100}
  validates :time, presence: :true
  enum status: {plivate: 0, public: 1}
end
