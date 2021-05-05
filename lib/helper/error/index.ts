import { APIError, ErrorMessage, ErrorType } from "../../models/error";

const errorRecord: Record<ErrorType, ErrorMessage> = {
  'params-missing': 'Some parameters are missing',
  'bad-request': 'Bad request'
}

const getErrorMessage = (errorType: ErrorType) => errorRecord[errorType];

const errorHandler = (errorType: ErrorType, message?: string, path?: string): APIError => {
  const errorMessage = message ? `${getErrorMessage(errorType)}: ${message}` : getErrorMessage(errorType);
  return {
    error: {
      code: 400,
      type: errorType,
      message: errorMessage,
      date: new Date().toISOString(),
      path
    }
  }
}

export {
  errorRecord,
  errorHandler,
  getErrorMessage
}