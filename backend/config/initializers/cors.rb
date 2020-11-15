# Permit cross origin
Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'localhost:3000'

      resource "*",
        headers: :any,
        methods: [:get, :post, :patch, :options, :head, :delete],
        credentials: true
    end

    allow do
      origins 'https://memotube.xyz','http://memotube.xyz'

      resource "*",
        headers: :any,
        methods: [:get, :post, :patch, :options, :head, :delete],
        credentials: true
    end
  end
