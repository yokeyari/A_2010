class FewMemoPageSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :workspace_id, :title, :url, :token
  belongs_to :user
  belongs_to :workspace_id
  has_many :memos
  has_many :tags

  def memos
    object.memos[0, 3]
  end
end
