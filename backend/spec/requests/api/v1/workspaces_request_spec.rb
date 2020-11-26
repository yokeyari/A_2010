require 'rails_helper'

RSpec.describe "Api::V1::WorkspacesController,", type: :request do
  before do
    @user = create(:user)
    valid_params = {email: @user.email, password: @user.password}
    post "/api/v1/authes/login", params: valid_params
    expect(response.status).to eq 200
  end

  context "when exist workspace and joined it," do
    before do
      @user2 = create(:google_user)
      @rel2 = create(:rel_wspace, user_id: @user2.id)
      @wspace = @rel2.workspace
      
      @rel = create(:rel_uaws, user_id: @user.id, workspace_id: @wspace.id)
    end

    it "get all workspaces which user join" do
      get "/api/v1/ws"

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json['workspaces'].size).to eq 1
    end

    it "get workspaces data" do
      get "/api/v1/ws/#{@wspace.id}"

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json['id']).to eq @wspace.id
    end

    it "update workspace" do
      valid_params = {
        name: "test2",
        users: [[@user.id, "general"]]
      }
      patch "/api/v1/ws/#{@wspace.id}", params: valid_params, as: :json

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json['name']).to eq "test2"
      expect(json['users'].find {|e| e['user']['id'] == @user.id}['permission']).to eq 'general'
    end

    it "destroy workspace" do
      page = create(:page, user_id: @user.id, workspace_id: @wspace.id)
      create(:tag, page_id: page.id)
      create(:memo, page_id: page.id, user_id: @user.id, account_id: @user.account_id)
      create(:browse_time, page_id: page.id, user_id: @user.id)
      create(:browse_day, page_id: page.id, user_id: @user.id)
      
      expect {delete "/api/v1/ws/#{@wspace.id}"}.
        to change(Workspace, :count).by(-1).
        and change(User, :count).by(0).
        and change(RelUserAndWorkspace, :count).by(-2).
        and change(Page, :count).by(-1).
        and change(Memo, :count).by(-1).
        and change(Tag, :count).by(-1).
        and change(BrowseTime, :count).by(-1).
        and change(BrowseDay, :count).by(-1)
      expect(response.status).to eq 200
    end

    it "get users who join workspace" do
      get "/api/v1/ws/#{@wspace.id}/users"

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json.size).to eq 2
    end

    it "get pages which workspace have" do
      page = create(:page, user_id: @user.id, workspace_id: @wspace.id)
      get "/api/v1/ws/#{@wspace.id}/pages"

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json.size).to eq 1
    end

    it "many users are joined" do
      user = create(:user, email: "huga@example.com", account_id: "huga")
      valid_params = {users: [[user.id, "general"]]}

      expect {post "/api/v1/ws/#{@wspace.id}/users", params: valid_params, as: :json}.to change(RelUserAndWorkspace, :count).by(+1)
      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      # expect(json)
    end

    it "quit workspace" do
      expect {delete "/api/v1/ws/#{@wspace.id}/user"}.to change(RelUserAndWorkspace, :count).by(-1)
      expect(response.status).to eq 200
    end

    it "many users are　quit" do
      valid_params = {users: [[@user.id]]}
      expect {delete "/api/v1/ws/#{@wspace.id}/users", params: valid_params, as: :json}.to change(RelUserAndWorkspace, :count).by(-1)
      expect(response.status).to eq 200
    end

    it "change workspace owner" do
      @rel.update!(permission: :owner)
      @rel2.update!(permission: :sup)
      patch "/api/v1/ws/#{@wspace.id}/owner", params: {user_id: @user2.id}

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json['users'].find {|e| e['user']['id'] == @user.id}['permission']).to eq 'sup'
      expect(json['users'].find {|e| e['user']['id'] == @user2.id}['permission']).to eq 'owner'
    end

    it "reset token" do
      token = @wspace.token
      patch "/api/v1/ws/#{@wspace.id}/token"

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json['tokne']).not_to eq token
    end
  end

  context "neither exist workspace nor join it," do
    it 'create workspace' do
      user2 = create(:google_user)
      valid_params = {
        name: "test",
        users: [[user2.id, "sup"]]
      }

      expect {post "/api/v1/ws", params: valid_params, as: :json}.
        to change(Workspace, :count).by(+1).
        and change(RelUserAndWorkspace, :count).by(+2)
      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json['name']).to eq "test"
      expect(json['users'].find {|e| e['permission'] == 'owner'}['user']['id']).to eq @user.id
      expect(json['users'].find {|e| e['permission'] == 'sup'}['user']['id']).to eq user2.id
    end

    it "join workspace" do
      wspace = create(:workspace)
      valid_params = {perm: "general"}

      expect {post "/api/v1/ws/#{wspace.id}", params: valid_params}.to change(RelUserAndWorkspace, :count).by(+1)
      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json['users'][0]['user']['id']).to eq @user.id
      expect(json['users'][0]['permission']).to eq "general"
    end

    it "get workspace by token" do
      wspace = create(:workspace)
      get "/api/v1/ws/token", params: {workspace_token: wspace.token}

      expect(response.status).to eq 200
      json = JSON.parse(response.body)
      expect(json['id']).to eq wspace.id
    end
  end
end
