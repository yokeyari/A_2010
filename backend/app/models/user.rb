class User < ApplicationRecord
  # 共通
  before_save {email && email.downcase!}
  has_secure_token
  has_secure_password validations: false
  has_many :pages, dependent: :destroy
  has_many :memos
  validates :name, presence: true, length: {maximum: 100}

  # google アカウントの時の
  with_options if: :google? do
    validates :external_id, presence: true, uniqueness: {scope: :provider}
  end
  
  # 独自の時の
  with_options if: :none? do
    validates :email, presence: true, uniqueness: {case_sensitive: false}, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}
    validates :password, presence: true, length: {minimum: 6}, on: :create
  end

private
  def google?
    provider == 'google'
  end

  def none?
    provider.nil?
  end
end
