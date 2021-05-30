import type { NextApiRequest, NextApiResponse } from 'next';
import { errorResponseHandler } from '../../../../lib/controller/response/error';
import { handleAccountUpdate } from '../../../../lib/controller/account/edit';
import { Account, EditAccount } from '../../../../lib/models/account';
import { findAccountById } from '../../../../lib/queries/account';
import { filterUser } from '../../../../lib/controller/user/filter';
import { ErrorResponse } from '../../../../lib/models/response';

const checkAccountUsers = async (accountId: string, users?: string | null): Promise<string[] | ErrorResponse> => {
  if(users || users !== '') {
    return users.split(', ');
  }

  const result = await filterUser([{key: 'account_id', value: accountId}]);
  if("error" in result) {
    return errorResponseHandler('query-error', 'cannot find the account users');
  }

  const usersList = result.map(user => user.id);
  return usersList;
}

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  
  if (req.method !== 'PUT') {
    return res.status(400).json(errorResponseHandler('bad-request'));
  }

  if (!id) {
    return res.status(400).json(errorResponseHandler('missing-params', 'id'));
  }
  
  const currentAccount = await findAccountById(id.toString());

  if("error" in currentAccount){
    return res.status(400).json(currentAccount);
  }

  const userList = await checkAccountUsers(currentAccount[0].id, req.body['users']);

  if("error" in userList){
    return res.status(400).json(userList);
  }

  const endpoints = String(req.body['endpoints']).split(', '); 

  const editedAccountData: EditAccount = {
    plan_id: req.body['plan_id'],
    name: req.body['name'],
    users: userList,
    endpoints,
  }

  const emptyFields = Object.keys(editedAccountData).filter(field => editedAccountData[field] === undefined);

  if(emptyFields.length > 0) {
    return res.status(400).json(errorResponseHandler('missing-params', emptyFields.join(', '), '/accounts/edit'));
  }

  const newAccountData: Account = {
    ...currentAccount[0],
    ...editedAccountData,
  }

  const result = await handleAccountUpdate(newAccountData, currentAccount[0]);

  if("error" in result){
    return res.status(400).json(result);
  }

  return res.status(200).json(result);
}

export default handleRequest;