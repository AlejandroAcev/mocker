import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../../lib/controller/user';
import { findUser } from '../../../lib/helper/user';

const getRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method === 'POST') {
    const user = {
      name: req.body['name'],
      email: req.body['email'],
      date_of_birth: req.body['date_of_birth'],
      role: req.body['role'],
    }
    const result = await createUser(user);
    return res.status(200).json({ data: result })
  }

  if (req.method === 'GET') {
    const email = req.body['email'];
    const result = await findUser(email);
    return res.status(200).json({ data: result })
  }
}

const checkContentType = async (req: NextApiRequest, res: NextApiResponse) => {
  const contentType = req.headers['content-type'];
  if (contentType === 'application/x-www-form-urlencoded') {
    return await getRequest(req, res);
  }

  return res.status(200).json({ data: { error: `Bad content-type: ${contentType}`} });
}

export default checkContentType;