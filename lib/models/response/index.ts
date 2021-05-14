import { PaginationResponse } from "./pagination";

// ERROR RESPONSE ❌

export type ErrorCode = 
  | 400 // Bad Request
  | 401 // Unauthorized
  | 403 // Forbidden
  | 404 // Not Found
  | 500; // Internal Server Error

export type ErrorType =
  | 'missing-params'
  | 'bad-request'
  | 'query-error'
  | 'email-exists';

export type ErrorMessage = 
  | 'Some parameters are missing'
  | 'Bad request'
  | 'Error searching in the database'
  | 'The email already exist';

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

export type ErrorResponse = APIError;

// SUCCESS RESPONSE ✅

export interface SuccessResponse<T> {
  data: T;
  total: number | 0;
  status: ResponseStatus;
  pagination?: PaginationResponse;
}

export type ResponseStatus = 'completed' | 'error';

export type DataResponse<T> = SuccessResponse<T> | ErrorResponse;