# Permit cross origin
Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:3000'
      credentials true
      resource "*",
        headers: :any,
        methods: [:get, :post, :patch, :options, :head, :delete]
    end
  end