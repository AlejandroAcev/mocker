import type { NextApiRequest, NextApiResponse } from 'next';
import { errorResponseHandler } from '../../../lib/controller/response/error';
import { successResponseHandler } from '../../../lib/controller/response/success';
import { findAccountById } from '../../../lib/queries/account';

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  
  if (req.method !== 'GET') {
    return res.status(400).json(errorResponseHandler('bad-request')); 
  }

  if (!id) {
    return res.status(400).json(errorResponseHandler('missing-params', 'id'));
  }

  const result = await findAccountById(id.toString());

  if("error" in result){
    return res.status(400).json(result);
  }

  return res.status(200).json(successResponseHandler(result))
}

export default handleRequest;