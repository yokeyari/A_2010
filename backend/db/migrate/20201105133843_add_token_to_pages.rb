class AddTokenToPages < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :token, :token
    add_column :pages, :token, :token
  end
end
