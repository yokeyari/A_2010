require 'rails_helper'

RSpec.describe BrowseTime, type: :model do
  before do
    @user = create(:user)
    @page = create(:page, user_id: @user.id)
  end

  it 'is valid with user_id, page_id and time' do
    browse_time = BrowseTime.new(user_id: @user.id, page_id: @page.id, time: 1)
    expect(browse_time).to be_valid
  end

  it 'is invalid without user_id, page_id or time' do
    browse_time = BrowseTime.new(user_id: nil, page_id: nil, time: nil)
    browse_time.valid?
    
    expect(browse_time.errors[:user]).to include("must exist")
    expect(browse_time.errors[:page]).to include("must exist")
    expect(browse_time.errors[:time]).to include("can't be blank")
  end

  it 'dose not allow same [user_id, page_id, time]' do
    BrowseTime.create(user_id: @user.id, page_id: @page.id, time: 1)
    browse_time = BrowseTime.new(user_id: @user.id, page_id: @page.id, time: 1)
    expect(browse_time).not_to be_valid
  end

  it 'is valid different time' do
    BrowseTime.create(user_id: @user.id, page_id: @page.id, time: 1)
    browse_time = BrowseTime.new(user_id: @user.id, page_id: @page.id, time: 2)
    expect(browse_time).to be_valid
  end
end
