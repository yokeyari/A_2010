class Page < ApplicationRecord
  has_many :memos, dependent: :destroy
  has_many :tags, dependent: :destroy

  belongs_to :user, optional: true
  belongs_to :workspace, optional: true
  has_secure_token
  validates :url, presence: :true
  validates :title, presence: :true
  validate :require_either_user_or_workspace

private
  def require_either_user_or_workspace
    return if (user.nil? ^ workspace.nil?) && (user.present? || workspace.present?)
    errors.add(:base, "require either user_id or workspace_id")
  end
end
