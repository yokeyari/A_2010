class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :provider, :external_id, :account_id
  has_many :workspaces
  has_many :pages, each_serializer: FewMemoPageSerializer
  # has_many :memos
  has_many :browse_times
  has_many :browse_days

  def workspaces
    object.rel_uaws
  end
end
