class RelUserAndWorkspaceSerializer < ActiveModel::Serializer
  attributes :permission
  belongs_to :user
  belongs_to :workspace
end