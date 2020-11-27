require 'rails_helper'

RSpec.describe "Api::V1::Pages", type: :request do
  context "logged in" do
    before do
      @user = create(:user)
      valid_params = {email: @user.email, password: @user.password}
      post "/api/v1/authes/login", params: valid_params
      expect(response.status).to eq 200
    end

    it "get all user's page" do
      5.times {create(:page, user_id: @user.id)}
      get "/api/v1/pages"

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json.size).to eq 5
    end

    it "get a page" do
      page = create(:page, user_id: @user.id)
      get "/api/v1/pages/#{page.id}"

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json['user_id']).to eq @user.id
    end

    it "create a page" do
      valid_params = {title: "hoge", url: "huga"}
      
      expect {post "/api/v1/pages", params: valid_params}.to change(Page, :count).by(+1)
      expect(response.status).to eq 200
    end

    it "update a page" do
      page = create(:page, user_id: @user.id)
      patch "/api/v1/pages/#{page.id}", params: {title: "foo", url: "bar"}

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json['title']).to eq "foo"
      expect(json['url']).to eq "bar"
    end

    it "destroy a page" do
      page = create(:page, user_id: @user.id)
      create(:tag, page_id: page.id)
      create(:memo, page_id: page.id, user_id: @user.id, account_id: @user.account_id)
      create(:browse_time, page_id: page.id, user_id: @user.id)
      create(:browse_day, page_id: page.id, user_id: @user.id)

      expect {delete "/api/v1/pages/#{page.id}"}
        .to change(Page, :count).by(-1)
        .and change(Memo, :count).by(-1)
        .and change(Tag, :count).by(-1)
        .and change(BrowseTime, :count).by(-1)
        .and change(BrowseDay, :count).by(-1)
      expect(response.status).to eq 200
    end

    it "search page" do
      page1 = create(:page, title: "baz", user_id: @user.id)
      page2 = create(:page, user_id: @user.id)
      create(:memo, text: "baz", page_id: page2.id, user_id: @user.id, account_id: @user.account_id)
      page3 = create(:page, user_id: @user.id)
      create(:tag, text: "baz", page_id: page3.id)
      post "/api/v1/pages/search", params: {keywords: ["baz"]}

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json.size).to eq 3
    end

    it "reset page token" do
      page = create(:page, user_id: @user.id)
      token = page.token
      patch "/api/v1/pages/#{page.id}/token"

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json['token']).not_to eq token
    end
  end

  context "not logged in" do
    it "get a page by token" do
      page = create(:user_page)
      get "/api/v1/pages/share", params: {page_token: page.token}

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json['id']).to eq page.id
    end
  end
end
