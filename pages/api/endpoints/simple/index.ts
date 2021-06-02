import { NextApiRequest, NextApiResponse } from "next";
import { handleCreateSimpleEndpoint } from "../../../../lib/controller/endpoint/simple";
import { errorResponseHandler } from "../../../../lib/controller/response/error";
import { successResponseHandler } from "../../../../lib/controller/response/success";
import { CreateSimpleEndpoint } from "../../../../lib/models/endpoint";

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(400).json(errorResponseHandler('bad-request'));
  }

  const {
    body,
    is_json
  } = req.body;
  // const account_id = req.body['account_id'];

  if (!body) {
    return res.status(400).json(errorResponseHandler('missing-params', '"body" field is required', '/endpoints/simple'));
  }

  const endpoint: CreateSimpleEndpoint = {
    body,
    is_json: is_json || false,
  }
  
  const result = await handleCreateSimpleEndpoint(endpoint);

  if("error" in result){
    return res.status(400).json(result);
  }

  return res.status(200).json(successResponseHandler(result));
}

export default handleRequest;