

class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    Error.captureStackTrace(this, this.constructor)
  }
}


// middlewares/ErrorHandler.js

function ErrorHandler(err, req, res, next) {
  // If it’s an operational error we threw ourselves, use its status
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ error: err.message })
  }

  // For any other (programming or unknown) error, hide details in prod
  console.error('Unexpected Error:', err)
  res
    .status(500)
    .json({ error: 'Something went wrong. Please try again later.' })
}

class ConflictError extends ApiError {
  constructor(message = 'Conflict') {
    super(409, message)
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}




export {ApiError,ErrorHandler,ConflictError,UnauthorizedError}
