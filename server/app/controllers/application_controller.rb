class ApplicationController < ActionController::Base
  before_action :set_current_user, :authenticate_request

  include AuthErrors
  include AuthHelper

  rescue_from AuthErrors::NotAuthenticatedErrortion do |exception|
    render json: { error: 'Not Authorized' }, status: :unauthorized
  end
  rescue_from AuthErrors::AuthenticationTimeoutError do |exception|
    render json: { error: 'Auth token is expired' }, status: 419 # unofficial timeout status code
  end

  private

  # Based on the user_id inside the token payload, find the user.
  def set_current_user
    if decoded_auth_token
      @current_user ||= Client.find(decoded_auth_token[:client_id])
    end
  end

  # Check to make sure the current user was set and the token is not expired
  def authenticate_request
    if auth_token_expired?
      fail AuthErrors::AuthenticationTimeoutError.new(error: "Authentication Timeout")
    elsif !@current_user
      fail AuthErrors::NotAuthenticatedErrortion.new(error: "Not Authorized")
    end
  end

  def decoded_auth_token
    @decoded_auth_token ||= AuthHelper::AuthToken.decode(http_auth_header_content)
  end

  def auth_token_expired?
    decoded_auth_token && decoded_auth_token.expired?
  end

  # JWT's are stored in the Authorization header using this format:
  # Bearer somerandomstring.encoded-payload.anotherrandomstring
  def http_auth_header_content
    return @http_auth_header_content if defined? @http_auth_header_content
    @http_auth_header_content = begin
      if request.headers['Authorization'].present?
        request.headers['Authorization'].split(' ').last
      else
        nil
      end
    end
  end
end
