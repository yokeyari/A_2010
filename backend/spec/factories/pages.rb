FactoryBot.define do
  factory :page do
    # user_id {1}
    # workspace_id {1}
    title {"hoge"}
    url {"hoge"}
  end

  factory :user_page, class: Page do
    association :user
    title {"hoge"}
    url {"huga"}
  end

  factory :ws_page, class: Page do
    association :user
    association :workspace
    title {"hoge"}
    url {"huga"}
  end
end
