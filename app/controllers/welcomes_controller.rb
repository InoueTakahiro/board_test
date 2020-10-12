class WelcomesController < ApplicationController

	def index
		@categories = Category.all()
		@category = Category.first()
		@posts = @category.disp_posts
		@users = User.all()
		session[:user] = @users.first()
	end

	def select_user
		@categories = Category.all()
		@category = Category.find(params[:post][:category_id])
		@posts = @category.disp_posts
		@users = User.all()
		session[:user] = User.find(params[:user_id])
		render json: {categories: @categories, category: @category, posts: @posts, users: @users, user: session[:user]}
	end

	def category_create
		category = Category.new(category_params)
		category.save!
		@categories = Category.all()
		@category = Category.find(params[:post][:category_id])
		@posts = @category.disp_posts
		@users = User.all()
		render json: {categories: @categories, category: @category, posts: @posts, users: @users, user: session[:user]}
	end

	def show
		@category = Category.find(params[:id])
		@posts = @category.disp_posts
		render json: {category: @category, posts: @posts}
	end

	def edit
		@post = Post.find(params[:id])
		@posts = Post.where(category_id: @post.category_id)
		render json: {posts: @posts, edit_post: @post}
	end
	
	def update
		post = Post.find(params[:id])
		post.memo = params[:memo]
		post.save!
		@posts = Post.where(category_id: post.category_id)
		render json: {posts: @posts, errors: post.errors.full_messages}
	end

	def create
		post = Post.new(post_params)
		post.save!
		@posts = Post.where(category_id: post.category_id)
		logger.debug(post.errors.inspect)
		render json: {posts: @posts, errors: post.errors.full_messages}
	end

	def destroy
		post = Post.find(params[:id])
		post.disp_flg = false
		post.save!
		@posts = Post.where({category_id: post.category_id})
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
