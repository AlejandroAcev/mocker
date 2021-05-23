import type { NextApiRequest, NextApiResponse } from 'next';
import { errorResponseHandler } from '../../../lib/controller/response/error';
import { successResponseHandler } from '../../../lib/controller/response/success';
import { getAllPlansQuery } from '../../../lib/queries/plan';

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {  
  if (req.method !== 'GET') {
    return res.status(400).json(errorResponseHandler('bad-request')); 
  }

  const result = await getAllPlansQuery();
  return res.status(200).json(successResponseHandler(result))
}

export default handleRequest;