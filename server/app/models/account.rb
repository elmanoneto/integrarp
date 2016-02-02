class Account < ActiveRecord::Base
  before_save :default_values
  belongs_to :client, inverse_of: :account

 def default_values
   self.balance ||= 0
 end
end
