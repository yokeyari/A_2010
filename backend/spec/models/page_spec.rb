require 'rails_helper'

RSpec.describe Page, type: :model do
  before do
    @user = create(:user)
    @wspace = create(:workspace)
  end

  it 'is valid with user_id, title and url' do
    page = Page.new(user_id: @user.id, title: ?a, url: ?a)
    expect(page).to be_valid
  end

  it 'is valid with exist workspace' do
    page = Page.new(user_id: @user.id, title: ?a, url: ?a, workspace_id: @wspace.id)
    expect(page).to be_valid
  end

  it 'is invalid without user_id, title, or url' do
    page = Page.new(user_id: nil, title: nil, url: nil)
    page.valid?

    expect(page.errors[:user]).to include("must exist")
    expect(page.errors[:title]).to include("can't be blank")
    expect(page.errors[:url]).to include("can't be blank")
  end

  it 'is invalid with not exist workspace_id' do
    page = Page.new(user_id: @user.id, title: ?a, url: ?a, workspace_id: @wspace.id + 1)
    expect(page).not_to be_valid
  end
end
