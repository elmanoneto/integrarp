class AuthController < ApplicationController

  skip_before_action :authenticate_request, :set_current_user

  def authenticate
    @client = Client.find_by(email: params[:email], password: params[:password])

    if @client
      render json: {auth_token: @client.generate_auth_token, client: @client,
      account: @client.account}, status: 202
    else
      render json: {error: 'Invalid email or password'}, status: :unauthorized
    end
  end

end
