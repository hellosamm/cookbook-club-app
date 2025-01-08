class Api::V1::EventsController < ApplicationController
  
  # GET api/v1/events
  def index
    # show all events
    @events = Event.all
    render json: @events
  end

  # POST api/v1/events
  def create
    # create a new event
    @event = Event.new()
    render json: @events

  end

  # SHOW api/v1/events/:id
  def show
    # show a single event
  end

  # PATCH/PUT api/v1/events/:id
  def update
    # update a single event
  end

  # DELETE api/v1/events/:id
  def destroy
    # delete a single event
  end
end
