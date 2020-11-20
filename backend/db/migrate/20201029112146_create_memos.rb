class CreateMemos < ActiveRecord::Migration[6.0]
  def change
    create_table :memos do |t|
      t.references :page, foreign_key: true, index: false, null: false
      t.references :user, foreign_key: true, index: false, null: false
      t.string :text, null: false
      t.integer :time, null: false
      t.integer :parent_id
      t.integer :status, null: false, default: 0

      t.timestamps
    end
    add_index :memos, [:user_id, :page_id]
  end
end
