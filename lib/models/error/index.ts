export type ErrorCode = 
  | 400 // Bad Request
  | 401 // Unauthorized
  | 403 // Forbidden
  | 404 // Not Found
  | 500; // Internal Server Error

export type ErrorType =
  | 'params-missing'
  | 'bad-request';

export type ErrorMessage = 
  | 'Some parameters are missing'
  | 'Bad request';

export interface ErrorBody {
  code: ErrorCode;
  type: ErrorType;
  message: string;
}

export interface APIError {
  error: ErrorBody & {
    date: string;
    path?: string;
  }
}
