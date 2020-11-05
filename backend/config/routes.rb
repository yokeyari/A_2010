Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      post 'users/login', to: 'users#login'
      #get 'users/logged_in', to: 'users#logged_in?'
      post 'users/logout', to: 'users#logout'
      
      get 'users', to: 'users#index'
      get 'users/:user_id', to: 'users#show'
      post 'users', to: 'users#create'
      patch 'users/:user_id', to: 'users#update'
      delete 'users/:user_id', to: 'users#destroy'

      get  'pages', to: 'pages#index'
      get  'pages/:page_id', to: 'pages#show'
      post 'pages', to: 'pages#create'
      patch 'pages/:page_id', to: 'pages#update'
      delete 'pages/:page_id', to: 'pages#destroy'
      post 'pages/search', to: 'page#search'
      get 'pages/token', to: 'pages#reset_token'

      get 'tags', to: 'tags#index'
      post 'tags', to: 'tags#create'
      delete 'tags/:tag_id', to: 'tags#destroy'
      patch 'tags/:tag_id', to: 'tags#update'
      get 'tags/automate', to: 'tags#automate'

      get 'memos', to: 'memos#index'
      post 'memos', to: 'memos#create'
      patch 'memos/:memo_id', to: 'memos#update'
      delete 'memos/:memo_id', to: 'memos#destroy'
    end
  end
end