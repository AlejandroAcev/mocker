import { ErrorCode, ErrorMessage, ErrorType } from "../../../models/response";
import { ErrorResponse } from "../../../models/response";

const errorRecord: Record<ErrorType, ErrorMessage> = {
  'missing-params': 'Some parameters are missing',
  'bad-request': 'Bad request',
  'query-error': 'Error searching in the database',
  'email-exists': 'The email already exist'
}

const getErrorMessage = (errorType: ErrorType) => errorRecord[errorType];

const errorResponseHandler = (
  type: ErrorType = 'bad-request',
  message?: string,
  path?: string,
  code: ErrorCode = 400,
): ErrorResponse => {
  const errorMessage = message ? `${getErrorMessage(type)}: ${message}` : getErrorMessage(type);
  const error = {
    error: {
      code: code,
      type: type,
      message: errorMessage,
      date: new Date().toISOString(),
      path
    }
  };
  
  return error;
}

export {
  errorRecord,
  errorResponseHandler,
  getErrorMessage,
}