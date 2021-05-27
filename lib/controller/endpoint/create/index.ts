import { findAccountById, updateAccountQuery } from '../../../queries/account';
import { findPlanById } from '../../../queries/plan';
import { EndpointResponse, EndpointRequest, NewEndpoint } from '../../../models/endpoint';
import { errorResponseHandler } from '../../response/error';
import { ErrorResponse } from '../../../models/response';
import { findUserById, updateUserQuery } from '../../../queries/user';
import { Microservice } from '../../../microservice';
import { Account } from '../../../models/account';
import { User } from '../../../models/user';

const handleCreateEndpoint = async (newEndpoint: NewEndpoint): Promise<EndpointResponse | ErrorResponse> => {
  // const account = await findAccountByParams(['users'], [newEndpoint.user_id]);
  const userResult = await findUserById(newEndpoint.user_id);

  if("error" in userResult) {
    return errorResponseHandler('query-error', `cannot find the user information: ${userResult}`, '/endpoints/create');
  }

  const user = userResult[0];
  const accountResult = await findAccountById(user.account_id);

  if("error" in accountResult) {
    return errorResponseHandler('query-error', `cannot find the user account: ${accountResult}`, '/endpoints/create');
  }

  const account = accountResult[0];
  const plan = await findPlanById(account.plan_id);

  if(!plan) {
    return errorResponseHandler('query-error', `cannot find the user plan: ${plan}`, '/endpoints/create');
  }

  const endpointsAmount = account.endpoints.length;
  const maxEndpointsAllowed = plan.endpoints_allowed;
  const isCreationAllowed = endpointsAmount < maxEndpointsAllowed;

  if(!isCreationAllowed) {
    return errorResponseHandler('endpoints-limit', `${account.endpoints.length}`, '/endpoints/create');
  }

  const endpoint: EndpointRequest = {
    ...newEndpoint,
    account_id: account.id
  }

  const endpointResult = await Microservice.create(endpoint);
  
  if(Array.isArray(endpointResult)) {
    return errorResponseHandler('endpoints-limit', `${account.endpoints.length}`, '/endpoints/create');
  }

  const newAccountData: Account = {
    ...account,
    endpoints: [...account.endpoints, endpointResult._id],
    endpoints_created: account.endpoints_created + 1,
    endpoints_active: account.endpoints_active + 1,
  }

  const accountUpdated = await updateAccountQuery(newAccountData);

  if("error" in accountUpdated) {
    return errorResponseHandler('query-error', `cannot update the user account: ${accountUpdated}`, '/endpoints/create');
  }

  const newUserData: User = {
    ...user,
    total_endpoints_created: user.total_endpoints_created + 1,
    endpoints_active: user.endpoints_active + 1,
  }

  const userUpdated = await updateUserQuery(newUserData);

  if("error" in userUpdated) {
    return errorResponseHandler('query-error', `cannot update the user information: ${userUpdated}`, '/endpoints/create');
  }

  return endpointResult;
}

export {
  handleCreateEndpoint
}