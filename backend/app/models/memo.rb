class Memo < ApplicationRecord
  belongs_to :page
  belongs_to :user
  validates :text, length: {maximum: 140}
  validates :time, presence: :true
  enum status: {pri: 0, pub: 1}

  validate :valid_parent_id
  validates :account_id, presence: true

  def valid_parent_id
    return if parent_id.nil? || Memo.find_by(id: parent_id)
    errors.add(:parent_id, "require either null or present")
  end
end
