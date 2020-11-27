require 'rails_helper'

RSpec.describe "Api::V1::Memos", type: :request do
  before do
    @page = create(:user_page)
    @user = @page.user
    valid_params = {email: @user.email, password: @user.password}
    post "/api/v1/authes/login", params: valid_params
    expect(response.status).to eq 200
  end

  it "get all page's memo" do
    5.times {create(:memo, page_id: @page.id, user_id: @user.id, account_id: @user.account_id)}
    get "/api/v1/memos", params: {page_id: @page.id}
    
    expect(response.status).to eq 200
    json = JSON.parse(response.body)
    expect(json.size).to eq 5
  end

  it "create memo" do
    valid_params = {
      page_id: @page.id,
      text: "test",
      time: 0
    }
    expect {post "/api/v1/memos", params: valid_params}.to change(Memo, :count).by(+1)
    expect(response.status).to eq 200
  end

  it "update memo" do
    memo = create(:memo, page_id: @page.id, user_id: @user.id, account_id: @user.account_id)
    valid_params = {
      text: "test2",
      time: 1,
      status: "pub"
    }
    patch "/api/v1/memos/#{memo.id}", params: valid_params

    expect(response.status).to eq 200
    json = JSON.parse(response.body)
    expect(json['text']).to eq "test2"
  end

  it "destroy memo" do
    memo = create(:memo, page_id: @page.id, user_id: @user.id, account_id: @user.account_id)

    expect {delete "/api/v1/memos/#{memo.id}"}.to change(Memo, :count).by(-1)
    expect(response.status).to eq 200
  end
end
