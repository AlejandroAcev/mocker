import { NextApiRequest, NextApiResponse } from "next";
import { handleCreateEndpoint } from "../../../../lib/controller/endpoint";
import { errorResponseHandler } from "../../../../lib/controller/response/error";
import { successResponseHandler } from "../../../../lib/controller/response/success";
import { NewEndpoint } from "../../../../lib/models/endpoint";

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(400).json(errorResponseHandler('bad-request'));
  }

  const body = req.body['body'];
  const name = req.body['name'];
  const user_id = req.body['user_id'];
  const is_json = req.body['is_json'];
  // const account_id = req.body['account_id'];

  if (!body || !name || !user_id) {
    return res.status(400).json(errorResponseHandler('missing-params', '"body" field is required', '/endpoints/create'));
  }

  const endpoint: NewEndpoint = {
    user_id,
    name,
    body,
    is_public: req.body['is_public'],
    is_active: req.body['is_active'],
    users_allowed: req.body['users_allowed'],
    methods_allowed: req.body['methods_allowed'],
    is_json: is_json || false,
  }
  
  const result = await handleCreateEndpoint(endpoint);

  if("error" in result){
    return res.status(400).json(result);
  }

  return res.status(200).json(successResponseHandler(result));
}

export default handleRequest;