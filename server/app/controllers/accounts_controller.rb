class AccountsController < ApplicationController

  before_action :set_current_user, :authenticate_request

  def index
    render json: {accounts: Account.all}, status: 202
  end

  def create
    @account = Account.new(client_params)

    if @account.save
      render json: {success: 'Success.'}, status: :created
    else
      render json: {error: @account.errors}, status: :unprocessable_entity
    end
  end

  def deposit
    if @account = Client.find_by(id: params[:id])
      @account.ballance += params[:value]
      render json: {success: 'Successfully.', account: @account}, status: 202
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

end
