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

ActiveRecord::Schema.define(version: 2020_11_23_073522) do

  create_table "browse_days", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "page_id", null: false
    t.integer "day", null: false
    t.integer "total_play", default: 0, null: false
    t.integer "total_write_memo", default: 0, null: false
    t.integer "total_else", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id", "page_id", "day"], name: "index_browse_days_on_user_id_and_page_id_and_day", unique: true
  end

  create_table "browse_times", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "page_id", null: false
    t.integer "time", null: false
    t.integer "total_play", default: 0, null: false
    t.integer "total_write_memo", default: 0, null: false
    t.integer "total_else", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id", "page_id", "time"], name: "index_browse_times_on_user_id_and_page_id_and_time", unique: true
  end

  create_table "memos", force: :cascade do |t|
    t.integer "page_id", null: false
    t.integer "user_id", null: false
    t.string "text", null: false
    t.integer "time", null: false
    t.integer "parent_id"
    t.integer "status", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id", "page_id"], name: "index_memos_on_user_id_and_page_id"
  end

  create_table "pages", force: :cascade do |t|
    t.integer "user_id"
    t.integer "workspace_id"
    t.string "url", null: false
    t.string "title", null: false
    t.string "token"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id", "workspace_id"], name: "index_pages_on_user_id_and_workspace_id"
  end

  create_table "rel_user_and_workspaces", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "workspace_id", null: false
    t.integer "permission", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id", "workspace_id"], name: "index_rel_user_and_workspaces_on_user_id_and_workspace_id", unique: true
  end

  create_table "tags", force: :cascade do |t|
    t.integer "page_id", null: false
    t.string "text", null: false
    t.boolean "is_automated", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["page_id"], name: "index_tags_on_page_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email"
    t.integer "provider", default: 0, null: false
    t.string "external_id"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "username"
    t.index ["email", "provider", "external_id", "username"], name: "index_users_on_email_and_provider_and_external_id_and_username", unique: true
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "token"
  end

  add_foreign_key "browse_days", "pages"
  add_foreign_key "browse_days", "users"
  add_foreign_key "browse_times", "pages"
  add_foreign_key "browse_times", "users"
  add_foreign_key "memos", "pages"
  add_foreign_key "memos", "users"
  add_foreign_key "pages", "users"
  add_foreign_key "pages", "workspaces"
  add_foreign_key "rel_user_and_workspaces", "users"
  add_foreign_key "rel_user_and_workspaces", "workspaces"
  add_foreign_key "tags", "pages"
end
