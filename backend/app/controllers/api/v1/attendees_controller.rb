class Api::V1::AttendeesController < ApplicationController
  before_action :set_attendee, only: %i[destroy]
  before_action :authorize_user, only: %i[destroy]

  def create
    @attendee = current_user.attendees.build(attendee_params)

    if @attendee.save 
      render json: {message: "successfully signed up for the event", data: @attendee}
    else
      render json: {message: "unable to sign up for the event", data: @attendee.errors}
    end
  end

  def show

  events = Event.joins(:attendees).where(attendees: { user_id: current_user.id }).uniq

  if events.any?
    render json: { data: events }, status: :ok
  else
    render json: { message: "No events found for this user" }, status: :not_found
  end

  end

  def destroy
  end

  private
  
  def attendee_params
    params.require(:attendee).permit(:event_id)
  end
end
