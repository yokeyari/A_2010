class User < ApplicationRecord
  has_many :pages
  validates :name, presence: true, length: {maximum: 100}
  validates :email, presence: true, uniqueness: true, format: {with: //}
end
