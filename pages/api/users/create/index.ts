import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../../../lib/controller/user";
import { errorResponseHandler } from "../../../../lib/controller/response/error";
import { validateEmail } from "../../../../lib/util";
import { successResponseHandler } from "../../../../lib/controller/response/success";

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method === 'POST') {
    const user = {
      name: req.body['name'],
      email: req.body['email'],
      date_of_birth: req.body['date_of_birth'],
      role: req.body['role'],
    }

    const emptyFields = Object.keys(user).filter(field => user[field] === undefined);

    if(emptyFields.length > 0) {
      return res.status(400).json(errorResponseHandler('missing-params', emptyFields.join(', '), '/users/create'));
    }

    const isValidEmail = validateEmail(user.email);

    if(!isValidEmail) {
      return res.status(400).json(errorResponseHandler('missing-params', 'the email is not valid', '/users/create'));
    }

    const result = await createUser(user);
    return res.status(200).json(successResponseHandler(result))
  }

  return res.status(400).json(errorResponseHandler('bad-request'));
}

export default handleRequest;