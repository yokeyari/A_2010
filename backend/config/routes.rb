Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      post 'authes/login',        to: 'authes#login'
      post 'authes/login/google', to: 'authes#login_google'
      get 'authes/islogin',       to: 'authes#islogin'
      delete 'authes/logout',     to: 'authes#logout'

      get 'ws',                        to: 'workspaces#index'
      get 'ws/:workspace_id',          to: 'workspaces#show'
      get 'ws/:workspace_id/users',    to: 'workspaces#all_users'
      get 'ws/:workspace_id/pages',    to: 'workspaces#all_pages'
      post 'ws',                       to: 'workspaces#create'
      post 'ws/:workspace_id',         to: 'workspaces#join'
      post 'ws/:workspace_id/users',   to: 'workspaces#join_users'
      patch 'ws/:workspace_id',        to: 'workspaces#update'
      patch 'ws/:workspace_id/token',  to: 'workspaces#reset_token'
      patch 'ws/:workspace_id/owner',  to: 'workspaces#change_owner'
      delete 'ws/:workspace_id',       to: 'workspaces#destroy'
      delete 'ws/:workspace_id/user',  to: 'workspaces#quit'
      delete 'ws/:workspace_id/users', to: 'workspaces#quit_users'
      
      get 'users',             to: 'users#index'
      get 'users/search',      to: 'users#username_search'
      get 'users/:user_id',    to: 'users#show'
      post 'users',            to: 'users#create'
      patch 'users/:user_id',  to: 'users#update'
      delete 'users/:user_id', to: 'users#destroy'

      get 'pages',                  to: 'pages#index'
      get 'pages/share',            to: 'pages#share'
      get 'pages/:page_id',         to: 'pages#show'
      post 'pages',                 to: 'pages#create'
      post 'pages/search',          to: 'pages#search'
      patch 'pages/:page_id',       to: 'pages#update'
      patch 'pages/:page_id/token', to: 'pages#reset_token'
      delete 'pages/:page_id',      to: 'pages#destroy'

      get 'tags',            to: 'tags#index'
      get 'tags/automate',   to: 'tags#automate'
      post 'tags',           to: 'tags#create'
      patch 'tags/:tag_id',  to: 'tags#update'
      delete 'tags/:tag_id', to: 'tags#destroy'

      get 'memos',             to: 'memos#index'
      post 'memos',            to: 'memos#create'
      patch 'memos/:memo_id',  to: 'memos#update'
      delete 'memos/:memo_id', to: 'memos#destroy'

      get  'pages/:page_id/analytics', to: 'analytics#index'
      post 'pages/:page_id/analytics', to: 'analytics#update'
    end
  end
end