class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :set_event, only: %i[show update destroy]
  before_action :authorize_user, only: %i[update destroy]

  # GET api/v1/events
  def index
    # show all events
    @events = Event.all
    render json: @events
  end

  # POST api/v1/events
  def create
    # create a new event
    puts current_user.id
    @event = current_user.created_events.build(event_params)

    # could also be written this way 
    # @event = Event.new(event_params.merge(user_id: current_user.id))

    if @event.save
      render json: {message: "event was added successfully", data: @event}
    else
      render json: {message: "failed to add event, missing required field", data: @event.errors}, status: :unprocessable_entity 
    end
  end

  # SHOW api/v1/events/:id
  def show
    # show a single event
    if @event
      render json: {message: "event found", data: @event}
    else
      render json: {message: "event not found", data: @event.errors }
    end
  end

  def attendance_status
    if current_user
      is_attending = Attendee.exists?(event_id: params[:id], user_id: current_user.id)
      render json: {data: is_attending}
    else 
      render json: {is_attending: false}
    end
  end

  # PATCH/PUT api/v1/events/:id
  def update
    # update a single event 
    if @event.update(event_params)
      render json: {message: "event updated", data: @event}
    else
      render json: {message: "event not updated", data: @event.errors }
    end
  end

  # DELETE api/v1/events/:id
  def destroy
    # delete a single event
    if @event.destroy
      render json: {message: "event deleted", data: @event}
    else
      render json: {message: "unable to delete the event", data: @event.errors }
    end
  end

  private

def event_params
  params.require(:event).permit(:title, :description, :start_time, :end_time, :location)
  # params.require(:event)permit(:title, :description, :start_time, :end_time, :location)
end

def set_event
  @event = Event.find(params[:id])
end

def authorize_user
  @event = Event.find(params[:id])
  unless @event.user == current_user
    render json: { error: "access denied"}, status: :forbidden
  end
end

end


