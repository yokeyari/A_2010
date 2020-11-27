require 'rails_helper'

RSpec.describe "Api::V1::AuthesController", type: :request do
  before do
    @user = create(:user)
  end
  
  it "login with email and password" do
    get "/api/v1/authes/islogin"
    expect(response.status).to eq 600

    valid_params = {
      email: @user.email,
      password: @user.password
    }
    post "/api/v1/authes/login", params: valid_params
    get "/api/v1/authes/islogin"
    expect(response.status).to be 200
  end

  it "logout" do
    valid_params = {
      email: @user.email,
      password: @user.password
    }
    post "/api/v1/authes/login", params: valid_params
    get "/api/v1/authes/islogin"
    expect(response.status).to be 200

    delete "/api/v1/authes/logout"
    get "/api/v1/authes/islogin"
    expect(response.status).to be 600
  end
end
