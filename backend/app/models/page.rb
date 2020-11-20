class Page < ApplicationRecord
  has_many :memos, dependent: :destroy
  has_many :tags, dependent: :destroy

  belongs_to :user, optional: true
  belongs_to :workspace, optional: true
  has_secure_token
  validates :user_id, presence: true
  validates :url, presence: :true
  validates :title, presence: :true
  validate :workspace_id_validation

private
  def workspace_id_validation
    return if workspace.nil? || workspace.present?
    errors.add(:base, "require workspace_id either null or present")
  end
end
