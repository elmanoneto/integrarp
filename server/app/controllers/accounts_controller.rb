class AccountsController < ApplicationController

  include AccountErrors

  before_action :set_current_user, :authenticate_request

  rescue_from AccountErrors::OverdrawnError do |exception|
    render json: {error: 'Overdrawn'}, status: :unprocessable_entity
  end
  rescue_from AccountErrors::CanNotTransferYourselfError do |exception|
    render json: {error: 'Can not transfer yourself'}, status: :unprocessable_entity
  end

  def index
    render json: {accounts: Account.all}, status: 202
  end

  def create
    @account = Account.new(client_params)

    if @account.save
      render json: {success: 'Success'}, status: :created
    else
      render json: {error: @account.errors}, status: :unprocessable_entity
    end
  end

  def deposit
    @account = Account.find_by(id: params[:id])
    @account.balance += params[:value]

    @statement = Statement.new(id_account: params[:id], balance: params[:value], type_statement: 'deposit')

    if @account.save and @statement.save
      render json: {success: 'Successfully', account: @account}, status: 202
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

  def debit
    @account = Account.find_by(id: params[:id])

    if @account.balance < params[:value]
      fail AccountErrors::OverdrawnError.new
    end

    @account.balance -= params[:value]

    @statement = Statement.new(id_account: params[:id], balance: params[:value], type_statement: 'debit')

    if @account.save and @statement.save
      render json: {success: 'Successfully', account: @account}, status: 202
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

  def transfer
    if params[:id_transfer] == params[:id]
      fail AccountErrors::CanNotTransferYourselfError.new
    end

    @account_transfer = Account.find_by(id: params[:id_transfer])
    @account = Account.find_by(id: params[:id])

    @account_transfer, @account = transaction(@account_transfer, @account, params[:value])

    @statement_transfer = Statement.new(id_account: params[:id_transfer],
    balance: params[:value], type_statement: 'transfer')
    @statement = Statement.new(id_account: params[:id], balance: params[:value], type_statement: 'recept')

    if @account_transfer.save and @account.save and @statement_transfer.save and @statement.save
      render json: {success: 'Successfully', account: @account_transfer}, status: 202
    else
      render json: {error: [@account.errors, @account_transfer.errors]}, status: :unprocessable_entity
    end
  end

  private

  def transaction(account_transfer, account, value)
    if account_transfer.balance < value
      fail AccountErrors::OverdrawnError.new
    end

    unless Date.today.strftime("%A") == 'Saturday' || Date.today.strftime("%A") == 'Sunday'
      if Time.new.hour >= 9 && Time.new.hour <= 18
        if @account_transfer.balance < value + 5
          fail AccountErrors::OverdrawnError.new
        end
        account_transfer.balance -= 5
      else
        if @account_transfer.balance < value + 7
          fail AccountErrors::OverdrawnError.new
        end
        account_transfer.balance -= 7
      end
    else
      account_transfer.balance -= 7
    end

    if value > 1000
      if @account_transfer.balance < value + 10
        fail AccountErrors::OverdrawnError.new
      end
      account_transfer.balance -= value + 10
    else
      account_transfer.balance -= value
    end

    account.balance += value

    return account_transfer, account
  end

end
