class Memo < ApplicationRecord
  belongs_to :page
  belongs_to :user
  validates :text, presence: :true, length: {maximum: 100}
  validates :time, presence: :true
<<<<<<< HEAD
  enum :status, {pli: 0, pub: 1}
=======
  enum status: {plivate: 0, public: 1}
>>>>>>> 903cd360bafbc11edde37c1773db96bcb30b093e
end
