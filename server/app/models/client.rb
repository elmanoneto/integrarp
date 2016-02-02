class Client < ActiveRecord::Base

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true

  has_one :account, inverse_of: :client, dependent: :destroy

  include AuthHelper

  def generate_auth_token
    payload = {client_id: self.id}
    AuthHelper::AuthToken.encode(payload)
  end

end
