class DeleteTags < ActiveRecord::Migration[6.0]
  def change
    remove_column :pages, :tags, :string
  end
end
