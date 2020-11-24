class TagSerializer < ActiveModel::Serializer
  attributes :id, :page_id, :text, :is_automated
  # belongs_to :page
end
