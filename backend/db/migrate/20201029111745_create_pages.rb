class CreatePages < ActiveRecord::Migration[6.0]
  def change
    create_table :pages do |t|
      t.references :user, foreign_key: true, index: false
      t.references :workspace, foreign_key: true, index: false
      t.string :url, null: false
      t.string :title, null: false
      t.string :token

      t.timestamps
    end
    add_index :pages, [:user_id, :workspace_id]
  end
end
