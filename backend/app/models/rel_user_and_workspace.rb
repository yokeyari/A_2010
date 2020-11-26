class RelUserAndWorkspace < ApplicationRecord
  before_destroy :destroy_owner

  belongs_to :user
  belongs_to :workspace
  validates :user_id, uniqueness: {scope: :workspace}
  enum permission: {guest: 0, general: 1, owner: 2, sup: 3}

private
  def destroy_owner
    return if destroyed_by_association.present? && destroyed_by_association.active_record.name == "Workspace"
    workspace.destroy if permission == "owner"
  end
end
