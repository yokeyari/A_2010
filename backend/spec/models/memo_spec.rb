require 'rails_helper'

RSpec.describe Memo, type: :model do
  before do
    @user = create(:user)
    @page = create(:page, user_id: @user.id)
  end

  it 'is valid with user_id, page_id, text and time' do
    memo = Memo.new(user_id: @user.id, page_id: @page.id, text: ?a, time: 0)
    expect(memo).to be_valid
  end

  it 'is valid when status is pri or pub' do
    memo = Memo.new(user_id: @user.id, page_id: @page.id, text: ?a, time: 0)
    memo.status = "pri"
    expect(memo).to be_valid

    memo.status = "pub"
    expect(memo).to be_valid
  end

  it 'is valid when parent is present' do
    memo1 = Memo.create(user_id: @user.id, page_id: @page.id, text: ?a, time: 0)
    memo2 = Memo.new(user_id: @user.id, page_id: @page.id, text: ?a, time: 0, parent_id: memo1.id)
    expect(memo2).to be_valid
  end

  it 'is invalid without user_id, page_id, text and time' do
    memo = Memo.new(user_id: nil, page_id: nil, text: nil, time: nil)
    memo.valid?
    expect(memo.errors[:user]).to include("must exist")
    expect(memo.errors[:page]).to include("must exist")
    expect(memo.errors[:text]).to include("can't be blank")
    expect(memo.errors[:time]).to include("can't be blank")
  end

  it 'is invalid when parent is not present' do
    memo = Memo.new(user_id: @user.id, page_id: @page.id, text: ?a, time: 0, parent_id: Memo.count + 1)
    memo.valid?
    expect(memo.errors[:parent_id]).to include("require either null or present")
  end
end
