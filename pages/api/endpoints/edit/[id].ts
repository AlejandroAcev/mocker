import { NextApiRequest, NextApiResponse } from "next";
import { handleEditEndpoint } from "../../../../lib/controller/endpoint";
import { errorResponseHandler } from "../../../../lib/controller/response/error";
import { successResponseHandler } from "../../../../lib/controller/response/success";
import { EditEndpoint, NewEndpoint } from "../../../../lib/models/endpoint";

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    return res.status(400).json(errorResponseHandler('bad-request'));
  }

  const { id } = req.query;
  const {
    name,
    body,
    times_used,
    users_allowed,
    methods_allowed,
    is_active,
    is_public,
    is_json,
    user_id,
  } = req.body;

  if (!id || !body || !name || !user_id) {
    return res.status(400).json(errorResponseHandler(
      'missing-params',
      `all the fields are required: ${id}, ${name}, ${body}, ${user_id}`,
      '/endpoints/edit'
    ));
  }

  const endpoint: EditEndpoint = {
    _id: id.toString(),
    user_id,
    name,
    body,
    is_public,
    is_active,
    is_json,
    users_allowed,
    methods_allowed,
    times_used,
    account_id: undefined,
  }
  
  const result = await handleEditEndpoint(endpoint);

  if("error" in result){
    return res.status(400).json(result);
  }

  return res.status(200).json(successResponseHandler(result));
}

export default handleRequest;