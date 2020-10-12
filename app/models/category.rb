class Category < ApplicationRecord
    has_many :posts, dependent: :destroy

    def disp_posts()
        return self.posts.where(disp_flg: true)
    end
end
