require 'rails_helper'

RSpec.describe BrowseDay, type: :model do
  before do
    @user = create(:user)
    @page = create(:page, user_id: @user.id)
  end

  it 'is valid with user_id, page_id and day' do
    browse_day = BrowseDay.new(user_id: @user.id, page_id: @page.id, day: Time.now)
    expect(browse_day).to be_valid
  end

  it 'is invalid without user_id, page_id or day' do
    browse_day = BrowseDay.new(user_id: nil, page_id: nil, day: nil)
    browse_day.valid?
    
    expect(browse_day.errors[:user]).to include("must exist")
    expect(browse_day.errors[:page]).to include("must exist")
    expect(browse_day.errors[:day]).to include("can't be blank")
  end

  it 'dose not allow same [user_id, page_id, day]' do
    now = Time.now
    BrowseDay.create(user_id: @user.id, page_id: @page.id, day: now)
    browse_day = BrowseDay.new(user_id: @user.id, page_id: @page.id, day: now)
    expect(browse_day).not_to be_valid
  end

  it 'is valid different day' do
    BrowseDay.create(user_id: @user.id, page_id: @page.id, day: Time.now)
    browse_day = BrowseDay.new(user_id: @user.id, page_id: @page.id, day: Time.now)
    expect(browse_day).to be_valid
  end
end
