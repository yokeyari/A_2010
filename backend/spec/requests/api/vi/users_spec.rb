require 'rails_helper'

describe "UserAPI" do
  context 'not logged in' do
    it 'get all user data' do
      create(:user)

      get '/api/v1/users'
      json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(json.size).to eq 1
    end

    it 'make user' do
      valid_params = {
        name: "hoge",
        email: "hoge@example.com",
        password: "qwerty",
        password_confirmation: "qwerty",
        username: "hoge"
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

    it 'get user data 1' do
      get "/api/v1/users/#{@user.id}"
      json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(json['name']).to eq @user.name
    end
  end
end