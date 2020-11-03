class CreatePages < ActiveRecord::Migration[6.0]
  def change
    create_table :pages do |t|
      t.belongs_to :user
      t.string :url

      t.timestamps
    end
  end
end
