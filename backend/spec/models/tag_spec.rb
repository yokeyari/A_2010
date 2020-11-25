require 'rails_helper'

RSpec.describe Tag, type: :model do
  before do
    @page = create(:user_page)
  end

  it 'is valid with page_id and text' do
    tag = Tag.new(page_id: @page.id, text: ?a)
    expect(tag).to be_valid
  end

  it 'is invalid without page_id or text' do
    tag = Tag.new(page_id: nil, text: nil)
    tag.valid?
    expect(tag.errors[:page]).to include("must exist")
    expect(tag.errors[:text]).to include("can't be blank")
  end
end
