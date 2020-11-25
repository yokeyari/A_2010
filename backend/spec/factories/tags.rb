FactoryBot.define do
  factory :tag do
    # page_id
    text {?a}
    # is_automated
  end

  factory :page_tag, class: Tag do
    association :page
    text {?a}
  end
end
