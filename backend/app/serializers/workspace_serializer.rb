class WorkspaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :token
  has_many :users
  has_many :pages, each_serializer: FewMemoPageSerializer

  def users
    object.rel_uaws
  end
end
