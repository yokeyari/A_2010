class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :provider, :external_id, :username
  has_many :workspaces # alias of rel_user_and_workspaces
  has_many :pages
  has_many :memos
end
