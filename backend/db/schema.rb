# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_05_133843) do

  create_table "memos", force: :cascade do |t|
    t.integer "page_id"
    t.string "text"
    t.integer "time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["page_id"], name: "index_memos_on_page_id"
  end

# Could not dump table "pages" because of following StandardError
#   Unknown type 'token' for column 'token'

  create_table "tags", force: :cascade do |t|
    t.integer "page_id"
    t.string "text"
    t.boolean "is_automated", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["page_id"], name: "index_tags_on_page_id"
  end

# Could not dump table "users" because of following StandardError
#   Unknown type 'token' for column 'token'

end
