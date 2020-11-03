class CreateMemos < ActiveRecord::Migration[6.0]
  def change
    create_table :memos do |t|
      t.belongs_to :page
      t.string :text
      t.integer :time

      t.timestamps
    end
  end
end
