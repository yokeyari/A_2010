class TagSerializer < ActiveModel::Serializer
  attributes :id, :page_id, :text
  # belongs_to :page
end
