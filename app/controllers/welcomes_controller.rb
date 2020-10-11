class WelcomesController < ApplicationController

	def index
		@categories = Category.all()
		@category = Category.first()
		@posts = @category.posts
	end

	def show
		@category = Category.find(params[:id])
		@posts = @category.posts
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
		post.save
		@posts = Post.where(category_id: post.category_id)
		render json: {posts: @posts, errors: post.errors.full_messages}
	end

	def create
		post = Post.new(post_params)
		post.save
		@posts = Post.where(category_id: post.category_id)
		logger.debug(post.errors.inspect)
		render json: {posts: @posts, errors: post.errors.full_messages}
	end

	def destroy
		post = Post.find(params[:id])
		post.destroy()
		@posts = Post.where({category_id: post.category_id})
		render json: {posts: @posts}
	end


	private
	def post_params()
		params.require(:post).permit(:name, :mail, :title, :memo, :category_id)
	end
end
