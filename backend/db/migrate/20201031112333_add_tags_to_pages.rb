class AddTagsToPages < ActiveRecord::Migration[6.0]
  def change
    add_column :pages, :tags, :text, array: true
  end
end
