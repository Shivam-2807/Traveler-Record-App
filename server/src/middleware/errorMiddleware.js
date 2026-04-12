export function notFound(request, response, next) {
  response.status(404);
  next(new Error(`Route not found: ${request.originalUrl}`));
}

export function errorHandler(error, request, response, next) {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode;

  response.status(statusCode).json({
    message: error.message || "Server error"
  });
}
