class User < ApplicationRecord
  before_save {email.downcase!}
  has_secure_password
  has_many :pages, dependent: :destroy
  validates :name, presence: true, length: {maximum: 100}
  validates :email, presence: true, uniqueness: {case_sensitive: false}, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}
  validates :password, presence: true, length: {minimum: 6}, on: :create
end
