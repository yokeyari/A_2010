class ChangeColumnName < ActiveRecord::Migration[6.0]
  def change
    remove_index :users, [:email, :provider, :external_id, :username]
    rename_column :users, :username, :account_id
    add_index :users, [:email, :provider, :external_id, :account_id], unique: true, name: "email_provider_external_id_account_id_index"

    add_column :memos, :account_id, :string, null: false
  end
end
