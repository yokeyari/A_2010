class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email
      t.integer :provider, null: false, default: 0
      t.string :external_id
      t.string :password_digest

      t.timestamps
    end
    add_index :users, [:email, :provider, :external_id], unique: true
  end
end
