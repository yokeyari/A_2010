class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.references :page, foreign_key: true, null: false
      t.string :text, null: false
      t.boolean :is_automated, null: false, default: false

      t.timestamps
    end
  end
end
