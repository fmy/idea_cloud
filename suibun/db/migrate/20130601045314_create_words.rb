class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.string :name, null: false
      t.integer :stage_id, null: false

      t.timestamps
    end
    add_index :words, :stage_id
  end
end
