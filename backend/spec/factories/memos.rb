FactoryBot.define do
  factory :memo do
    # user_id
    # page_id
    # parent_id
    text {?a}
    time {0}
    # status
    # account_id
  end

  factory :auto_memo, class: Memo do
    association :page, factory: :user_page
    user_id {page.user.id}
    text {"test"}
    time {0}
    account_id {page.user.account_id}
  end
end
