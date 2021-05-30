import { Microservice } from "../../../microservice";
import { EditEndpoint, EndpointResponse } from "../../../models/endpoint";
import { ErrorResponse } from "../../../models/response";
import { findAccountById } from "../../../queries/account";
import { findPlanById } from "../../../queries/plan";
import { findUserById } from "../../../queries/user";
import { errorResponseHandler } from "../../response/error";


const handleEditEndpoint = async (editedEndpoint: EditEndpoint): Promise<EndpointResponse | ErrorResponse> => {

  const userResult = await findUserById(editedEndpoint.user_id);

  if("error" in userResult) {
    return errorResponseHandler('query-error', `cannot find the user information: ${userResult}`, '/endpoints/create');
  }

  const accountResult = await findAccountById(userResult[0].account_id);

  if("error" in accountResult) {
    return errorResponseHandler('query-error', `cannot find the user account: ${accountResult[0]}`, '/endpoints/edit');
  }

  const account = accountResult[0];
  const plan = await findPlanById(account.plan_id);

  if(!plan) {
    return errorResponseHandler('query-error', `cannot find the user plan: ${plan}`, '/endpoints/edit');
  }

  const existEndpoint = account.endpoints.includes(editedEndpoint._id);

  if(!existEndpoint) {
    return errorResponseHandler('endpoint-not-exist', `${editedEndpoint._id}`, '/endpoints/edit');
  }

  const currentUsers = String(editedEndpoint.users_allowed).split(',').map(id => id.trim());
  const users_allowed = editedEndpoint.users_allowed && editedEndpoint.users_allowed.length !== 0 
    ? currentUsers.includes(editedEndpoint.user_id) 
      ? currentUsers
      : [...currentUsers, editedEndpoint.user_id]
    : [editedEndpoint.user_id]; 

  const endpoint: EditEndpoint = {
    ...editedEndpoint,
    users_allowed,
    account_id: account.id
  }

  const hasEmptyFields = Object.keys(endpoint)
    .filter(key => endpoint[key] === null || endpoint[key] === undefined)

    console.log('Lenght: ', hasEmptyFields)
  if(hasEmptyFields.length !== 0) {
    return errorResponseHandler('missing-params', `${hasEmptyFields.join(', ')}`, '/endpoints/edit');
  }

  const endpointResult = await Microservice.edit(endpoint._id, endpoint);
  
  if(Array.isArray(endpointResult)) {
    return errorResponseHandler('endpoints-limit', `${account.endpoints.length}`, '/endpoints/edit');
  }

  return endpointResult;
}

export {
  handleEditEndpoint
}