class PageSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :workspace_id, :title, :url, :token

  belongs_to :workspace
  belongs_to :user
  has_many :memos
  has_many :tags
end
