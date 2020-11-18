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

ActiveRecord::Schema.define(version: 2020_11_17_060656) do

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
    t.index ["email", "provider", "external_id"], name: "index_users_on_email_and_provider_and_external_id", unique: true
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "memos", "pages"
  add_foreign_key "memos", "users"
  add_foreign_key "pages", "users"
  add_foreign_key "pages", "workspaces"
  add_foreign_key "rel_user_and_workspaces", "users"
  add_foreign_key "rel_user_and_workspaces", "workspaces"
  add_foreign_key "tags", "pages"
end
