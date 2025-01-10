# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionFix
  respond_to :json

  def create
    user = User.new(sign_up_params)
    if user.save
      render json: { message: "Signed up sucessfully.", data: user}, status: :ok
    else
      render json: { message: "Error signing up.", errors: user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    user = current_user

    if user
      user.destroy
      render json: { message: "Account deleted successfully." }, status: :ok 
    else
      render json: { message: "User not found or account has already been deleted." }, status: :not_found
    end
  end

  # before_action :authenticate_user!, only: [:destroy]
  # 
  # before_action :log_authorization_header
  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :username, :bio, :first_name, :last_name)
  end



  # def respond_with(resource, _opts = {})
  #   puts 'testing 123'
  #   puts request.method


  #   if request.method == "POST" && resource.persisted?
  #     render json: { message: "Signed up sucessfully.", data: resource}, status: :ok
  #   elsif request.method == "DELETE"
  #     resource.destroy
  #     render json: { message: "Account deleted successfully." }, status: :ok 
  #   else
  #     render json: { 
  #       message: "User couldn't be created successfully.", 
  #       errors: resource.errors.full_messages.to_sentence 
  #     }, status: :unprocessable_entity 
  #   end
  # end
end
