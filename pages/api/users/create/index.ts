import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../../../lib/controller/user";
import { errorResponseHandler } from "../../../../lib/controller/response/error";
import { validateEmail } from "../../../../lib/util";
import { successResponseHandler } from "../../../../lib/controller/response/success";
import { findUserById } from "../../../../lib/queries/user";

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method !== 'POST') {
    return res.status(400).json(errorResponseHandler('bad-request'));
  }

  const email = req.body['email'] || '';

  const user = {
    name: req.body['name'],
    lastname: req.body['lastname'],
    email: email.toLowerCase(),
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

  if("error" in result){
    return res.status(400).json(result);
  }

  const checkIfUserExist = await findUserById(result.id);

  if("error" in checkIfUserExist || checkIfUserExist.length === 0){
    return res.status(400).json(errorResponseHandler('query-error', `error creating the user: ${checkIfUserExist}`, '/users/create'));
  }

  return res.status(200).json(successResponseHandler(checkIfUserExist))
  
}

export default handleRequest;