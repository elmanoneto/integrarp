class RemoveClientFromAccounts < ActiveRecord::Migration
  def change
    remove_column :accounts, :client_id, :integer
  end
end
