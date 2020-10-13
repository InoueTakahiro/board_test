Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'welcomes#index'
  resources :welcomes
  get 'select_user', to: 'welcomes#select_user'
  get 'category_create', to: 'welcomes#category_create'
  get 'category_destroy/:id', to: 'welcomes#category_destroy'
end
