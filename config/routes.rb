Rails.application.routes.draw do
  devise_for :users, :controllers => {
    :registrations => 'users/registrations',
    :sessions => 'users/sessions'   
  } 

  devise_scope :user do
    get "sign_in", :to => "users/sessions#new"
    get "sign_out", :to => "users/sessions#destroy" 
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'welcomes#index'
  resources :welcomes
  get 'select_user', to: 'welcomes#select_user'
  get 'category_create', to: 'welcomes#category_create'
  get 'category_destroy/:id', to: 'welcomes#category_destroy'
end
