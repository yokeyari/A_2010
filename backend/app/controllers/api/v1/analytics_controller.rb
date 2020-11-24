require 'time'

class Api::V1::AnalyticsController < ApplicationController
  before_action :current_user
  # before_action :set_bug_bug_bug

  def update
    page = Page.find params[:page_id]
    state = "total_#{params[:state]}".to_sym
    day = Time.parse(params[:day])
    
    b_time = BrowseTime.find_or_create_by(user_id: @user.id, page_id: page.id, time: params[:time])
    b_day = BrowseDay.find_or_create_by(user_id: @user.id, page_id: page.id, day: day)

    b_time.increment! state, 1
    b_day.increment! state, 1

    res_ok
  end

  def index
    page = Page.find params[:page_id]
    res_ok page, inc: [:browse_times, :browse_days]
  end
end
