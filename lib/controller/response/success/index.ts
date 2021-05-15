import { ResponseStatus, SuccessResponse } from "../../../models/response";
import { PaginationResponse } from "../../../models/response/pagination";

const successResponseHandler = <T>(data: T | T[], pagination?: PaginationResponse, status: ResponseStatus = 'completed'): SuccessResponse<T> => {
  const response = {
    data,
    status,
    pagination,
    total: Array.isArray(data) ? data.length : 1,
  }

  return response;
}

export {
  successResponseHandler
}