Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      post 'authes/login', to: 'authes#login'
      post 'authes/login/google', to: 'authes#login_google'
      get 'authes/islogin', to: 'authes#islogin'
      delete 'authes/logout', to: 'authes#logout'

      get 'ws', to: 'workspaces#index'
      get 'ws/:workspace_id', to: 'workspaces#show'
      get 'ws/:workspace_id/users', to: 'workspaces#all_users'
      get 'ws/:workspace_id/pages', to: 'workspaces#all_pages'
      post 'ws', to: 'workspaces#create'
      post 'ws/:workspace_id/add_user', to: 'workspaces#add_user'
      post 'ws/:workspace_id/add_users', to: 'workspaces#add_users'
      patch 'ws/:workspace_id', to: 'workspaces#update'
      delete 'ws/:workspace_id', to: 'workspaces#destroy'
      
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
      post 'pages/search', to: 'pages#search'
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