class Post < ApplicationRecord
  belongs_to :category
  belongs_to :user
  validates :memo, presence: true

  def self.disp_all(where_hash, admin_flg)
    unless admin_flg
      where_hash[:disp_flg] = true
    end
    return Post.where(where_hash)
  end

  def name
    if self[:name].blank?
      self[:name] = "-"
    end
    return self[:name]
  end

  def mail
    if self[:mail].blank?
      self[:mail] = "-"
    end
    return self[:mail]
  end

  def title
    if self[:title].blank?
      self[:title] = "-"
    end
    return self[:title]
  end


end
