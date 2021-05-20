import type { NextApiRequest, NextApiResponse } from 'next';
import { validate } from 'uuid';
import { errorResponseHandler } from '../../../../lib/controller/response/error';
import { handleDeleteUser } from '../../../../lib/controller/user/delete';
import { User } from '../../../../lib/models/user';
import { findUserById } from '../../../../lib/queries/user';

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const userId = id.toString();
  
  if (req.method !== 'DELETE') {
    return res.status(400).json(errorResponseHandler('bad-request'));
  }

  if (!userId || !validate(userId)) {
    return res.status(400).json(errorResponseHandler('missing-params', 'id'));
  }
  
  const currentUser = await findUserById(userId);

  if("error" in currentUser){
    return res.status(400).json(currentUser);
  }

  const result = await handleDeleteUser(currentUser[0]);

  if("error" in result){
    return res.status(400).json(result);
  }

  return res.status(200).json(result);
}

export default handleRequest;