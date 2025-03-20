export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromResponse(response: any): ApiError {
    return new ApiError(
      response.status,
      response.code || 'UNKNOWN_ERROR',
      response.message || 'Произошла ошибка',
      response.data
    );
  }

  static isApiError(error: any): error is ApiError {
    return error instanceof ApiError;
  }
}

export const handleApiError = (error: any): never => {
  if (error.response) {
    throw ApiError.fromResponse(error.response.data);
  }
  if (error.request) {
    throw new ApiError(
      0,
      'NETWORK_ERROR',
      'Ошибка сети. Проверьте подключение к интернету.'
    );
  }
  throw new ApiError(
    0,
    'UNKNOWN_ERROR',
    'Произошла неизвестная ошибка'
  );
}; 