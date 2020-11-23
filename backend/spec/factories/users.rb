FactoryBot.define do
  factory :user do
    name {'hoge'}
    email {'hoge@example.com'}
    password {'qwerty'}
    password_confirmation {'qwerty'}
    username {'hoge'}
  end
end