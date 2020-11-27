require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  context 'not logged in' do
    it 'get all user data' do
      create(:user)

      get '/api/v1/users'
      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json.size).to eq 1
    end

    it 'make user' do
      valid_params = {
        name: "hoge",
        email: "hoge@example.com",
        password: "qwerty",
        password_confirmation: "qwerty",
        account_id: "hoge"
      }

      expect {post '/api/v1/users', params: valid_params}.to change(User, :count).by(+1)
      expect(response.status).to eq 200
    end
  end

  context 'logged in' do
    before do
      @user = create(:user)
      valid_params = {email: @user.email, password: @user.password}
      post '/api/v1/authes/login', params: valid_params
      expect(response.status).to eq 200
    end

    it 'get user data' do
      get "/api/v1/users/#{@user.id}"

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json['name']).to eq @user.name
    end

    it 'update user data' do
      valid_params = {name: 'huga', email: 'huga@example.com', account_id: 'huga'}
      patch "/api/v1/users/#{@user.id}", params: valid_params

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json['name']).to eq 'huga'
    end

    it 'destroy user data (expect without workspace)' do
      page = create(:page, user_id: @user.id)
      create(:memo, page_id: page.id, user_id: @user.id, account_id: @user.account_id)
      create(:tag, page_id: page.id)
      create(:browse_time, user_id: @user.id, page_id: page.id)
      create(:browse_day, user_id: @user.id, page_id: page.id)

      expect {delete "/api/v1/users/#{@user.id}"}
        .to change(User, :count).by(-1)
        .and change(Page, :count).by(-1)
        .and change(Memo, :count).by(-1)
        .and change(Tag, :count).by(-1)
        .and change(BrowseTime, :count).by(-1)
        .and change(BrowseDay, :count).by(-1)
      expect(response.status).to eq 200
    end

    context 'destroy user data (expect only workspace)' do
      it "user is not owner" do
        wspace = create(:workspace)
        rel = create(:rel_uaws, user_id: @user.id, workspace_id: wspace.id)

        expect {delete "/api/v1/users/#{@user.id}"}
          .to change(User, :count).by(-1)
          .and change(Workspace, :count).by(0)
          .and change(RelUserAndWorkspace, :count).by(-1)
        expect(response.status).to eq 200
      end

      it "user is owner" do
        wspace = create(:workspace)
        rel = create(:rel_uaws, user_id: @user.id, workspace_id: wspace.id, permission: :owner)

        expect {delete "/api/v1/users/#{@user.id}"}
          .to change(User, :count).by(-1)
          .and change(Workspace, :count).by(-1)
          .and change(RelUserAndWorkspace, :count).by(-1)
        expect(response.status).to eq 200
      end
    end

    it 'search user account_id' do
      get "/api/v1/users/search", params: {account_id: "ho"}
      
      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json.size).to be 1
    end
  end
end
