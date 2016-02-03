class CreateStatements < ActiveRecord::Migration
  def change
    create_table :statements do |t|
      t.integer :id_account
      t.decimal :balance
      t.string :type

      t.timestamps
    end
  end
end
