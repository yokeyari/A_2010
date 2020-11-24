require 'time'

FactoryBot.define do
  factory :browse_day do
    # user_id {1}
    # page_id {1}
    day {Time.parse("2020/01/01")}
    # total_play
    # total_write_memo
    # total_else
  end
end
