# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include RackSessionFix
  respond_to :json

  private
  
  def respond_with(resource, _opts = {})
    if request.method == "POST" && resource.persisted?
      render json: { message: "Logged in sucessfully.", data: resource}, status: :ok
    elsif request.method == "DELETE"
      render json: { message: "Logged out successfully." }, status: :ok 
    else
      render json: { 
        message: "Couldn't find an actice session.", 
        # errors: resource.errors.full_messages.to_sentence 
      }, status: :unauthorized 
    end
  end
end
