require 'rails_helper'

RSpec.describe BrowseTime, type: :model do
  before do
    @user = create(:user)
    @page = create(:page, user_id: @user.id)
  end

  it 'is valid with user_id, page_id and time' do
    browse_time = BrowseTime.new(
      user_id: @user.id,
      page_id: @page.id,
      time: 1
    )
    expect(browse_time).to be_valid
  end
end
