import type { NextApiRequest, NextApiResponse } from 'next';
import { errorHandler } from '../../../lib/helper/error';
import { findUser } from '../../../lib/helper/user';

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'GET') {
    const email = req.body['email'];
    
    if (!email) {
      return res.status(400).json(errorHandler('params-missing', 'email'));
    }

    const result = await findUser(email);
    return res.status(200).json({ data: result })
  }

  return res.status(400).json(errorHandler('bad-request'));
}

// const checkContentType = async (req: NextApiRequest, res: NextApiResponse) => {
//   const contentType = req.headers['content-type'];
//   if (contentType === 'application/x-www-form-urlencoded') {
//     return await getRequest(req, res);
//   }

//   return res.status(200).json({ data: { error: `Bad content-type: ${contentType}`} });
// }

export default handleRequest;