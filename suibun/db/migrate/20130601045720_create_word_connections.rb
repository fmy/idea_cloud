class CreateWordConnections < ActiveRecord::Migration
  def change
    create_table :word_connections do |t|
      t.integer :word_id, null: false
      t.integer :connect_word_id, null: false
      t.integer :status, null: false, default: 0

      t.timestamps
    end
    add_index :word_connections, [:word_id, :connect_word_id], unique: true
  end
end
