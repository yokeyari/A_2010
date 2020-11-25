require 'rails_helper'

RSpec.describe User, type: :model do
  it "is valid with name, email, password and username" do
    user = User.new(
      name: "hoge", 
      email: "hoge@example.con", 
      password: "qwerty", 
      password_confirmation:"qwerty",
      username: "hoge"
    )

    expect(user).to be_valid
  end

  it "is valid with name, esxternal_id, username" do
    user = User.new(
      name: "hoge", 
      provider: "google",
      external_id: 11111,
      username: "hoge"
    )

    expect(user).to be_valid
  end

  it "is invalid without name or username" do
    user = User.new(name: nil, username: nil)
    user.valid?
    expect(user.errors[:name]).to include("can't be blank")
    expect(user.errors[:username]).to include("can't be blank")
  end
end
