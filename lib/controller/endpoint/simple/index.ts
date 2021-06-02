import { Microservice } from "../../../microservice"
import { CreateSimpleEndpoint, EndpointResponse } from "../../../models/endpoint"
import { ErrorResponse } from "../../../models/response"
import { errorResponseHandler } from "../../response/error";


const handleCreateSimpleEndpoint = async (simpleEndpoint: CreateSimpleEndpoint): Promise<EndpointResponse | ErrorResponse> => {

  const result = await Microservice.simple.create(simpleEndpoint);

  if(Array.isArray(result)) {
    return errorResponseHandler('bad-request', `${result.join(', ')}`, '/simple/create');
  }

  return result;
}

export {
  handleCreateSimpleEndpoint
}