import type { NextApiRequest, NextApiResponse } from 'next';
import { errorResponseHandler } from '../../../../lib/controller/response/error';
import { handleUpdateUser } from '../../../../lib/controller/user/edit';
import { User } from '../../../../lib/models/user';
import { findUserById } from '../../../../lib/queries/user';

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  
  if (req.method !== 'POST') {
    return res.status(400).json(errorResponseHandler('bad-request'));
  }

  if (!id) {
    return res.status(400).json(errorResponseHandler('missing-params', 'id'));
  }
  
  const currentUser = await findUserById(id.toString());

  if("error" in currentUser){
    return res.status(400).json(currentUser);
  }

  const newUserData: User = {
    ...currentUser[0],
    name: req.body['name'],
    lastname: req.body['lastname'],
    role: req.body['role'],
  }

  const result = await handleUpdateUser(newUserData);

  if("error" in result){
    return res.status(400).json(result);
  }

  return res.status(200).json(result);
}

export default handleRequest;