class ClientsController < ApplicationController

  before_action :set_current_user, :authenticate_request, except: [:index, :create, :show]

  def index
    render json: Client.all, status: 202
  end

  def create
    @account = Account.new
    @client = Client.new(
      name: params[:name],
      email: params[:email],
      password: params[:password],
    )
    @client.account = @account

    if @client.save
      render json: {success: 'Client created.', client: @client}, status: 202
    else
      render json: @client.errors, status: :unprocessable_entity
    end

  end

  def show
    @client = Client.find_by(id: params[:id])

    if @client
      render json: {client: @client}, status: 202
    else
      render json: {error: 'Client not found'}, status: 404
    end
  end

  def update
    @client = Client.find_by(id: params[:id])
    @client.update(email: params[:email], name: params[:name], password: params[:password])

    if @client.save
      render json: {success: 'Client update.', client: @client}, status: 202
    else
      render json: {error: @client.errors}, status: :unprocessable_entity
    end
  end

  private

  def client_params
    params.require(:client).permit(:name, :email, :password, :account_id)
  end

end
