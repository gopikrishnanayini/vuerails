Rails.application.routes.draw do

  devise_for :users
  root 'homes#index'

  resources :homes
  resources :teachers
  namespace :api do
    resources :teachers
  end
end
