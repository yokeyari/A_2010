class Api::V1::AnalyticsController < ApplicationController
  before_action :current_user
  # before_action :set_bug_bug_bug
  before_action :find_page

  def update
    state = "total_#{params[:state]}".to_sym
    day = Date.parse(params[:day])
    # day = Date.today
    
    b_time = BrowseTime.find_or_create_by(user_id: @user.id, page_id: @page.id, time: params[:time])
    b_day = BrowseDay.find_or_create_by(user_id: @user.id, page_id: @page.id, day: day)

    b_time.increment! state, 1
    b_day.increment! state, 1

    res_ok
  end

  def index
    res_ok @page, inc: [:browse_times, :browse_days]
  end

private
  def find_page
    @page = Page.find params[:page_id]
  end
end
