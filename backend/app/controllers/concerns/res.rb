module Res
  extend ActiveSupport::Concern

  def res_ok(**hash)
    render json: hash, status: :ok
  end

  def res_not_found(**hash)
    render json: hash, status: :not_found
  end

  def res_bad_resuest(**hash)
    render json: hash, status: :bad_resuest
  end
end