require 'rails_helper'

RSpec.describe RelUserAndWorkspace, type: :model do
  Rel_UAWS = RelUserAndWorkspace

  before do
    @user = create(:user)
    @wspace = create(:workspace)
  end

  it 'is valid with user_id and workspace_id' do
    rel = Rel_UAWS.new(user_id: @user.id, workspace_id: @wspace.id)
    expect(rel).to be_valid
  end

  it 'is valid with permission [guest, general, sup, owner]' do
    rel = Rel_UAWS.new(user_id: @user.id, workspace_id: @wspace.id, permission: :guest)
    expect(rel).to be_valid

    rel.permission = :general
    expect(rel).to be_valid

    rel.permission = :sup
    expect(rel).to be_valid

    rel.permission = :owner
    expect(rel).to be_valid
  end

  it 'is invalid without user_id or workspace_id' do
    rel = Rel_UAWS.new(user_id: nil, workspace_id: nil)
    rel.valid?
    expect(rel.errors[:user]).to include("must exist")
    expect(rel.errors[:workspace]).to include("must exist")
  end

  it 'is invalid same user_id and workspace_id' do
    Rel_UAWS.create(user_id: @user.id, workspace_id: @wspace.id, permission: :general)
    rel = Rel_UAWS.new(user_id: @user.id, workspace_id: @wspace.id, permission: :owner)
    expect(rel).not_to be_valid
  end
end
