FactoryBot.define do
  factory :user do
    name {'hoge'}
    email {'hoge@example.com'}
    password {'qwerty'}
    password_confirmation {'qwerty'}
    account_id {'hoge'}
  end

  factory :google_user, class: User do
    name {"google"}
    provider {"google"}
    external_id {"1"}
    account_id {"google"}
  end
end