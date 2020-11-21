module TypicalRes
  extend ActiveSupport::Concern

  def res_ok(body = nil, inc: nil)
    render json: body, include: inc, status: :ok # 200
  end

  def res_not_found
    render status: :not_found # 404
  end

  def res_bad_request(**hash)
    render json: hash, status: :bad_request # 400
  end

  def res_forbidden
    render status: :forbidden # 403
  end

  def res_unauthorized
    render status: :unauthorized
  end

  def res_errors(e)
    res_bad_request errors: e.errors.messages, model: e.class.name
  end
end
