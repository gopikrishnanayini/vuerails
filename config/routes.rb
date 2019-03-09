Rails.application.routes.draw do

  root 'homes#index'

  resources :homes
  resources :teachers
  namespace :api do
    resources :teachers
  end
end
