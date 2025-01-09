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
    event = Event.new(event_params)

    if event.save
      render json: {message: "event was added successfully", data: event}
    else
      render json: {message: "failed to add event", data: event.errors}
    end
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

private

def event_params
  params.permit(:title, :description, :start_time, :end_time, :location)
end
