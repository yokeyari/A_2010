class AddtitleToPages < ActiveRecord::Migration[6.0]
  def change
    add_column :pages, :title, :string
  end
end
