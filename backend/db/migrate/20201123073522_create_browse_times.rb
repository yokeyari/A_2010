class CreateBrowseTimes < ActiveRecord::Migration[6.0]
  def change
    create_table :browse_times do |t|
      t.references :user, foreign_key: true, index: false, null: false
      t.references :page, foreign_key: true, index: false, null: false
      t.integer :time, null: false
      t.integer :total_play, null: false, default: 0
      t.integer :total_write_memo, null: false, default: 0
      t.integer :total_else, null: false, default: 0

      t.timestamps
    end

    add_index :browse_times, [:user_id, :page_id, :time], unique: true
  end
end
