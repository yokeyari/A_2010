FactoryBot.define do
  factory :rel_user_and_workspace do
    
  end

  factory :rel_uaws, class: RelUserAndWorkspace do
    
  end

  factory :rel_wspace, class: RelUserAndWorkspace do
    association :workspace
    permission {"owner"}
  end
end