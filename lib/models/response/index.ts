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
  | 'email-exists'
  | 'endpoints-limit';

export type ErrorMessage = 
  | 'Some parameters are missing'
  | 'Bad request'
  | 'Error searching in the database'
  | 'The email already exist'
  | 'Endpoints limit reached';

export interface ErrorBody {
  code: ErrorCode;
  type: ErrorType;
  message: string;
}

export interface ErrorResponse {
  error: ErrorBody & {
    date: string;
    path?: string;
  }
}

// SUCCESS RESPONSE ✅

export interface SuccessResponse<T> {
  data: T | T[];
  total: number | 0;
  status: ResponseStatus;
  pagination?: PaginationResponse;
}

export type ResponseStatus = 'completed' | 'error';

export type DataResponse<T> = SuccessResponse<T> | ErrorResponse;