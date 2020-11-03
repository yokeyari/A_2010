class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.belongs_to :page
      t.string :text
      t.boolean :is_automated

      t.timestamps
    end
  end
end
