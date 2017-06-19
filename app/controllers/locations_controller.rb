class LocationsController < ApplicationController
  def show
    @location = Location.find(params[:id])
  end

  def index
    @locations = Location.all
    if user_signed_in?
      @dashboard = Dashboard.new(user: current_user, posts: top_posts, filter: :top_stories)
    else
      @dashboard = Dashboard.new(posts: top_posts, filter: :top_stories)
    end
  end

  private

  def top_posts
    Post.published.top_stories(5).includes(:user)
  end

end
