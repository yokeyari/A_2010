class Page < ApplicationRecord
  has_many :memos, dependent: :destroy
  has_many :tags, dependent: :destroy
  has_many :browse_days, dependent: :destroy
  has_many :browse_times, dependent: :destroy

  belongs_to :user
  belongs_to :workspace, optional: true
  has_secure_token
  validates :user_id, presence: true
  validates :url, presence: :true
  validates :title, presence: :true
  validate :workspace_id_validation

private
  def workspace_id_validation
    return if workspace_id.nil? || workspace.present?
    errors.add(:workspace, "require either null or present")
  end
end
