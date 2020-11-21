class User < ApplicationRecord
  # 共通
  before_save :fill_null

  has_many :pages, dependent: :destroy
  has_many :memos
  has_many :rel_user_and_workspaces, dependent: :destroy
  
  has_secure_password validations: false
  validates :name, presence: true, length: {maximum: 30}
  enum provider: {own: 0, google: 1}
  validates :username, presence: true, length: {maximum: 100}, uniqueness: true

  # google アカウントの時の
  with_options if: :google? do
    validates :external_id, presence: true, uniqueness: {scope: :provider}
  end
  
  # 独自の時の
  with_options if: :own? do
    validates :email, presence: true, uniqueness: {case_sensitive: false}, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}
    validates :password, presence: true, length: {minimum: 6}, on: :create
  end

  alias rel_uaws rel_user_and_workspaces
  alias workspaces rel_user_and_workspaces

private
  def fill_null
    if own?
      email.downcase!
      external_id = nil
    elsif google?
      email = nil
      password = nil
    end
  end
end
