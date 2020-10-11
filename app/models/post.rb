class Post < ApplicationRecord
  belongs_to :category
  validates :memo, presence: true
end
