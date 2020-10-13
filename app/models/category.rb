class Category < ApplicationRecord
    has_many :posts, dependent: :destroy
    attribute :count_posts

    def count_posts
        self.count_posts = self.posts.count
    end
    def disp_posts(admin_flg)
        if admin_flg
            return self.posts
        else
            return self.posts.where(disp_flg: true)
        end
    end
end
