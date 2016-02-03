class AddTypeStatementToStatement < ActiveRecord::Migration
  def change
    add_column :statements, :type_statement, :string
  end
end
