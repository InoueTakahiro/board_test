class Post < ApplicationRecord
  belongs_to :category
  belongs_to :user
  validates :memo, presence: true

  def self.disp_all(where_hash)
    where_hash[:disp_flg] = true
    return Post.where(where_hash)
  end
end
