import axios from 'axios';

import { EndpointRequest, EndpointResponse } from "../models/endpoint";

const serviceUri = process.env.MICROSERVICE_URI || 'http://127.0.0.1:4001/api';

const serviceEndpointUri = `${serviceUri}/endpoints`

type SuccessCode = 
  | 200
  | 201

type ErrorCode = 
  | 400
  | 401
  | 403
  | 404
  | 500

type ResponseCode = SuccessCode | ErrorCode;

type RequestStatus = 'completed' | 'pending' | 'failed';

interface SuccessResponse<T> {
  code: ResponseCode;
  message: string;
  status: RequestStatus;
  date: string;
  total: number;
  data: T | T[];
}

interface ErrorResponse {
  code: ResponseCode;
  message: string;
  status: RequestStatus;
  date: string;
  errors: any[];
}

const handleMicroResponse = <T>(response: SuccessResponse<T> | ErrorResponse) => {
  if("errors" in response) {
    return response.errors;
  }

  return response.data;
}

const Microservice = {
  create: async (endpoint: EndpointRequest): Promise<EndpointResponse | any[]> => {
    const data = await axios.post(serviceEndpointUri, endpoint)
      .catch(error => {
        console.error('---> Error in the connection with the microservice: ', error);
        // throw error;
        return null;
      });
    
    const result = handleMicroResponse<EndpointResponse>(data);
    return result;
  },

  find: async (endpoint_id: string): Promise<EndpointResponse | any[]> => {
    const data = await axios.get(`${serviceEndpointUri}/${endpoint_id}`)
      .catch(error => {
        console.error('---> Error in the connection with the microservice: ', error);
        // throw error;
        return null;
      });
    const result = handleMicroResponse<EndpointResponse>(data);
    return result;
  },
}

export {
  Microservice
}