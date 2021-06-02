import axios from 'axios';

import { CreateSimpleEndpoint, EditEndpoint, EndpointRequest, EndpointResponse, SimpleEndpoint } from "../models/endpoint";

const serviceUri = process.env.MICROSERVICE_URI || 'http://127.0.0.1:4001/api';

const serviceEndpointUri = `${serviceUri}/endpoints`
const serviceSimpleEndpointUri = `${serviceUri}/simple`
const serviceEndpointDataUri = `${serviceUri}/data`

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

const handleMicroResponse = <T>(response: { data: SuccessResponse<T> | ErrorResponse }) => {
  if("errors" in response.data) {
    return response.data.errors;
  }

  return response.data.data;
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

  edit: async (endpoint_id: string, endpoint: EditEndpoint): Promise<EndpointResponse | any[]> => {
    const data = await axios.put(`${serviceEndpointUri}/${endpoint_id}`, endpoint )
      .catch(error => {
        console.error('---> Error in the connection with the microservice: ', error);
        // throw error;
        return null;
      });
    const result = handleMicroResponse<EndpointResponse>(data);
    return result;
  },
  
  delete: async (endpoint_id: string): Promise<EndpointResponse | any[]> => {
    const data = await axios.delete(`${serviceEndpointUri}/${endpoint_id}`)
      .catch(error => {
        console.error('---> Error in the connection with the microservice: ', error);
        // throw error;
        return null;
      });
    const result = handleMicroResponse<EndpointResponse>(data);
    return result;
  },

  use: async (endpoint_id: string): Promise<EndpointResponse | any[]> => {
    const data = await axios.get(`${serviceEndpointDataUri}/${endpoint_id}` )
      .catch(error => {
        console.error('---> Error in the connection with the microservice: ', error);
        // throw error;
        return null;
      });
    const result = handleMicroResponse<EndpointResponse>(data);
    return result;
  },

  simple: {
    create: async (endpoint: CreateSimpleEndpoint): Promise<EndpointResponse | any[]> => {
      const data = await axios.post(serviceSimpleEndpointUri, endpoint)
        .catch(error => {
          console.error('---> Error in the connection with the microservice: ', error);
          // throw error;
          return null;
        });
      
      const result = handleMicroResponse<EndpointResponse>(data);
      return result;
    },

    use: async (id: string) => {
      const data = await axios.get(`${serviceEndpointDataUri}/${id}` )
        .catch(error => {
          console.error('---> Error in the connection with the microservice: ', error);
          // throw error;
          return null;
        });
      const result = handleMicroResponse<EndpointResponse>(data);
      return result;
    }
  }
}

export {
  Microservice
}