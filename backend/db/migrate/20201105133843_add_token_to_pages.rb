class AddTokenToPages < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :token, :string
    add_column :pages, :token, :string
  end
end
