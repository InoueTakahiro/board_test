class WelcomesController < ApplicationController
	
	def index
		@users = User.all
		sign_in @users.to_a[1]		
		@categories = Category.all()
		@category = Category.first()
		@posts = @category.disp_posts(current_user["admin_flg"])
		session[:category] = @category
	end

	def select_user
		@categories = Category.all()
		@category = Category.find(params[:post][:category_id])
		user = User.find(params[:user_id])
		sign_in user
		@posts = @category.disp_posts(current_user["admin_flg"])
		render json: {categories: @categories, category: @category, posts: @posts, user: current_user}
	end

	def category_create
		category = Category.new(name: params[:name])
		category.save
		@categories = Category.all()
		render json: {categories: @categories}
	end

	def category_destroy
		Category.destroy(params[:id])
		@categories = Category.all()
		if session[:category]["id"] == params[:id].to_i
			session[:category] = @categories.first()
		end
		@posts = Category.find(session[:category]["id"]).posts()
		render json: {categories: @categories, category: session[:category], posts: @posts}
	end

	def show
		@category = Category.find(params[:id])
		@posts = @category.disp_posts(current_user["admin_flg"])
		session[:category] = @category
		render json: {category: @category, posts: @posts}
	end

	def edit
		@category = Category.find(params[:id])
		render json: {edit_category: @category}
	end
	
	def update
		category = Category.find(params[:id])
		category.name = params[:name]
		category.save
		@categories = Category.all()
		render json: {categories: @categories}
	end

	def create
		post = Post.new(post_params)
		post.save
		@posts = Post.disp_all({category_id: post.category_id}, current_user["admin_flg"])
		if post.errors.blank?
			post.name = ""
			post.mail = ""
			post.title = ""
			post.memo = ""
		end
		render json: {posts: @posts, errors: post.errors.full_messages,
						name: post.name, mail: post.mail, title: post.title, memo: post.memo}
	end

	def destroy
		post = Post.find(params[:id])
		post.disp_flg = false
		post.save
		@posts = Post.disp_all({category_id: post.category_id}, current_user["admin_flg"])
		render json: {posts: @posts}
	end


	private
	def post_params()
		params.require(:post).permit(:name, :mail, :title, :memo, :category_id, :user_id)
	end

	def category_params()
		params.require(:category).permit(:name)
	end
end
