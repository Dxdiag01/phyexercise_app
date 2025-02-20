export interface ErrorResponse {
  code: string;
  message: string;
  details?: any;
}

export class AppError extends Error {
  code: string;
  details?: any;

  constructor(error: ErrorResponse) {
    super(error.message);
    this.code = error.code;
    this.details = error.details;
    this.name = 'AppError';
  }
}

export const isAppError = (error: any): error is AppError => {
  return error instanceof AppError;
};

export const createError = (code: string, message: string, details?: any): AppError => {
  return new AppError({ code, message, details });
};

export const handleError = (error: any): ErrorResponse => {
  if (isAppError(error)) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }

  // Beklenmeyen hatalar için
  return {
    code: 'UNKNOWN_ERROR',
    message: error?.message || 'Beklenmeyen bir hata oluştu',
    details: error,
  };
}; 