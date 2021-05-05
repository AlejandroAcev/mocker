import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../../../lib/controller/user";
import { errorHandler } from "../../../../lib/helper/error";

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  
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

  // if (req.method === 'GET') {
  //   const email = req.body['email'];
  //   const result = await findUser(email);
  //   return res.status(200).json({ data: result })
  // }

  return res.status(400).json(errorHandler('bad-request'));
}

export default handleRequest;