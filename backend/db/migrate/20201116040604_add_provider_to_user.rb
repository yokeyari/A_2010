class AddProviderToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :provider, :string
    add_column :users, :external_id, :string

    add_column :memos, :parent_id, :integer
    add_reference :memos, :user, foreign_key: true
  end
end
