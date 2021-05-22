import type { NextApiRequest, NextApiResponse } from 'next';
import { handleDeleteAccount } from '../../../../lib/controller/account/delete';
import { errorResponseHandler } from '../../../../lib/controller/response/error';

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  
  if (req.method !== 'DELETE') {
    return res.status(400).json(errorResponseHandler('bad-request')); 
  }

  if (!id) {
    return res.status(400).json(errorResponseHandler('missing-params', 'id'));
  }

  const result = await handleDeleteAccount(id.toString());

  if("error" in result){
    return res.status(400).json(result);
  }

  return res.status(200).json(result); 
}

export default handleRequest;