# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include RackSessionFix
  respond_to :json

  # def create
  #   user = User.find_by(email: sign_in_params[:email])
    
  #   if user
  #     if user.valid_password?(sign_in_params[:password])
  #       render json: { message: "Logged in successfully.", data: user }, status: :ok
  #     else
  #       render json: { message: "Invalid email or password." }, status: :unauthorized
  #     end
  #   else
  #     Rails.logger.warn("User not found for email: #{sign_in_params[:email]}")
  #     render json: { message: "Invalid email or password." }, status: :unauthorized
  #   end
  # rescue => e
  #   Rails.logger.error("Error in SessionsController#create: #{e.message}")
  #   Rails.logger.error(e.backtrace.join("\n"))
  #   render json: { message: "An error occurred." }, status: :internal_server_error
  # end
  

  private

  # def sign_in_params
  #   params.require(:user).permit(:email, :password)
  # end
  
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
