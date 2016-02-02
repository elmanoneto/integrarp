class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.integer :client_id
      t.boolean :active
      t.decimal :balance, :precision => 8, :scale => 2

      t.timestamps
    end
  end
end
