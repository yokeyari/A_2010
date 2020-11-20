class CreateRelUserAndWorkspaces < ActiveRecord::Migration[6.0]
  def change
    create_table :rel_user_and_workspaces do |t|
      t.references :user, foreign_key: true, index: false, null: false
      t.references :workspace, foreign_key: true, index: false, null: false
      t.integer :permission, default: 0, null: false
      t.timestamps
    end
    add_index :rel_user_and_workspaces, [:user_id, :workspace_id], unique: true
  end
end
