class WorkspaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :token
  has_many :users # alias of rel_user_and_workspaces
  has_many :pages
end
