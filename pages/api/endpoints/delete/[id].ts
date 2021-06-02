import type { NextApiRequest, NextApiResponse } from 'next';
import { errorResponseHandler } from '../../../../lib/controller/response/error';
import { successResponseHandler } from '../../../../lib/controller/response/success';
import { Microservice } from '../../../../lib/microservice';

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  
  if (req.method !== 'DELETE') {
    return res.status(400).json(errorResponseHandler('bad-request')); 
  }

  if (!id) {
    return res.status(400).json(errorResponseHandler('missing-params', 'id'));
  }

  const result = await Microservice.find(id.toString());

  if("error" in result){
    return res.status(400).json(result);
  }

  const data = result || {};
  return res.status(200).json(successResponseHandler(data))
}

export default handleRequest;
