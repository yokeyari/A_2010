require 'rails_helper'

RSpec.describe Workspace, type: :model do
  it 'is valid with name' do
    ws = Workspace.new(name: 'hoge')
    expect(ws).to be_valid
  end

  it 'is invalid without name' do
    ws = Workspace.new(name: nil)
    ws.valid?
    expect(ws.errors[:name]).to include("can't be blank")
  end
end
