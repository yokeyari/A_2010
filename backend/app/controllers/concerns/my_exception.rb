module MyException
  class MyForbidden < Exception; end
  class MyUnauthorized < Exception; end

  rescue_from ActiveRecord::RecordNotFound, with: :res_not_found
  rescue_from ActiveRecord::RecordInvalid,  with: :res_errors_record
  rescue_from MyForbidden,                  with: :res_forbidden
  rescue_from MyUnauthorized,               with: :res_unauthorized
end