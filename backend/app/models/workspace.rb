class Workspace < ApplicationRecord
  has_many :rel_user_and_workspaces, dependent: :destroy
  has_many :pages, dependent: :destroy
  
  has_secure_token
  validates :name, presence: true, length: {maximum: 30}

  alias rel_uaws rel_user_and_workspaces
  WorkSpace = Workspace
end
