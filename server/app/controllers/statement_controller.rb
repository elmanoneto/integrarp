class StatementController < ApplicationController

  before_action :set_current_user, :authenticate_request, except: [:index]

  def index
    render json: {accounts: Statement.all}, status: 202
  end

  def show
    @statement = Statement.where('created_at BETWEEN ? AND ? AND id_account = ?',
    params[:begin], params[:end], params[:id])

    if @statement
      render json: {statements: @statement}, status: 202
    else
      render json: {error: 'Not found'}, status: :unprocessable_entity
    end
  end

end
