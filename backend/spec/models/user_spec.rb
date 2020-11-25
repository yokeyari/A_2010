require 'rails_helper'

RSpec.describe User, type: :model do
  it "is valid with name, email, password and account_id" do
    user = User.new(
      name: "hoge", 
      email: "hoge@example.con", 
      password: "qwerty", 
      password_confirmation:"qwerty",
      account_id: "hoge"
    )

    expect(user).to be_valid
  end

  it "is valid with name, esxternal_id, account_id" do
    user = User.new(
      name: "hoge", 
      provider: "google",
      external_id: 11111,
      account_id: "hoge"
    )

    expect(user).to be_valid
  end

  it "is invalid without name or account_id" do
    user = User.new(name: nil, account_id: nil)
    user.valid?
    expect(user.errors[:name]).to include("can't be blank")
    expect(user.errors[:account_id]).to include("can't be blank")
  end
end
