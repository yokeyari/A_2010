require 'rails_helper'

RSpec.describe "Api::V1::Analytics", type: :request do
  before do
    # make user and login
    @user = create(:user)
    valid_params = {email: @user.email, password: @user.password}
    post '/api/v1/authes/login', params: valid_params
    expect(response.status).to eq 200

    # make page
    @page = create(:page, user_id: @user.id)

    # make browse data
    @browse_time = create(:browse_time, user_id: @user.id, page_id: @page.id)
    @browse_day = create(:browse_day, user_id: @user.id, page_id: @page.id)
  end

  it 'get browse data : get /api/v1/pages/:page_id/analytics' do
    get "/api/v1/pages/#{@page.id}/analytics"
    
    expect(response.status).to eq 200
    json = JSON.parse(response.body)
    expect(json['browse_times'][0]['id']).to eq @browse_time.id
    expect(json['browse_days'][0]['id']).to eq @browse_day.id
  end

  it 'change browse data : post /api/v1/pages/:page_id/analytics' do
    valid_params = {state: "play", time: 2, day: '2020/01/01'}
    expect {post "/api/v1/pages/#{@page.id}/analytics", params: valid_params}
      .to change(BrowseTime, :count).by(+1)
      .and change(BrowseDay, :count).by(0)
    expect(response.status).to be 200
  end
end
