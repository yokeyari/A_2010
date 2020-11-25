class SearchPageSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :workspace_id, :title, :url, :token

  # belongs_to :workspace
  # belongs_to :user
  # has_many :memos
  has_many :tags
  # has_many :browse_times
  # has_many :browse_days
end
