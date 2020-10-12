class Post < ApplicationRecord
  belongs_to :category
  belongs_to :user
  validates :memo, presence: true
end
