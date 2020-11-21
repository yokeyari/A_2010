class AddUniqueNameToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :username, :string, unique: true
    remove_index :users, column: [:email, :provider, :external_id]
    add_index :users, [:email, :provider, :external_id, :username], unique: true

    add_column :workspaces, :token, :string
  end
end
