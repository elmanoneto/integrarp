class RemoveTypeFromStatement < ActiveRecord::Migration
  def change
    remove_column :statements, :type, :string
  end
end
