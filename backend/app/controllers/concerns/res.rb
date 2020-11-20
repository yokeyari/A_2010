module Res
  def res_ok(body, inc: nil)
    render json: body, include: inc, status: :ok # 200
  end

  def res_not_found **hash
    render json: hash, status: :not_found # 404
  end

  def res_bad_resuest **hash
    render json: hash, status: :bad_resuest # 400
  end

  def res_unauthorized **hash
    render json: hash, status: :unauthorized # 401
  end

  def res_forbidden **hash
    render json: hash, status: :forbidden # 403
  end

  def res_errors(e)
    res_bad_resuest errors: e.errors.messages, model: e.class.name
  end
end