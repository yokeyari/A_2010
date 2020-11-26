require 'rails_helper'

RSpec.describe "Api::V1::Tags", type: :request do
  before do
    @page = create(:user_page)
    @user = @page.user

    # log in
    valid_params = {email: @user.email, password: @user.password}
    post "/api/v1/authes/login", params: valid_params
    expect(response.status).to eq 200
  end

  it "get all page's tags" do
    create(:tag, page_id: @page.id)
    create(:tag, page_id: @page.id, is_automated: true)
    get "/api/v1/tags", params: {page_id: @page.id}
    json = JSON.parse(response.body)

    expect(response.status).to eq 200
    expect(json.size).to eq 2
  end

  it "create tag" do
    valid_params = {page_id: @page.id, text: "test"}
    expect {post "/api/v1/tags", params: valid_params}.to change(Tag, :count).by(+1)
    expect(response.status).to eq 200
  end

  it "destroy tag" do
    tag = create(:tag, page_id: @page.id)
    expect {delete "/api/v1/tags/#{tag.id}"}.to change(Tag, :count).by(-1)
    expect(response.status).to eq 200
  end

  it "update tag" do
    tag = create(:tag, page_id: @page.id)
    valid_params = {text: "test2"}
    patch "/api/v1/tags/#{tag.id}", params: valid_params
    json = JSON.parse(response.body)

    expect(response.status).to eq 200
    expect(json['text']).to eq 'test2'
  end

  it "automaticary tags" do
    get "/api/v1/tags/automate", params: {page_id: @page.id}
    json = JSON.parse(response.body)

    expect(response.status).to eq 200
    expect(json[0]['is_automated']).to eq true
  end
end
