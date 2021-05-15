import { NextApiRequest, NextApiResponse } from "next";
import { createAccount } from "../../../../lib/controller/account/create";
import { errorResponseHandler } from "../../../../lib/controller/response/error";
import { successResponseHandler } from "../../../../lib/controller/response/success";

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.body['user_id'];

  if(!userId) {
    return res.status(400).json(errorResponseHandler('missing-params', 'user_id', '/accounts/create'));
  }
  
  if(req.method !== 'POST') {
    return res.status(400).json(errorResponseHandler('bad-request'));
  }

  const result = await createAccount(userId);
  return res.status(200).json(successResponseHandler(result))
}

export default handleRequest;