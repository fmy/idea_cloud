# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130601045720) do

  create_table "stages", :force => true do |t|
    t.string   "name",       :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "word_connections", :force => true do |t|
    t.integer  "word_id",                        :null => false
    t.integer  "connect_word_id",                :null => false
    t.integer  "status",          :default => 0, :null => false
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
  end

  add_index "word_connections", ["word_id", "connect_word_id"], :name => "index_word_connections_on_word_id_and_connect_word_id", :unique => true

  create_table "words", :force => true do |t|
    t.string   "name",       :null => false
    t.integer  "stage_id",   :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "words", ["stage_id"], :name => "index_words_on_stage_id"

end
