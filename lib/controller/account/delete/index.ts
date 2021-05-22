import { findAccountById, deleteAccountQuery } from '../../../queries/account';
import { errorResponseHandler } from '../../response/error';
import { successResponseHandler } from '../../response/success';

const handleDeleteAccount = async (accountId: string) => {
  const account = await findAccountById(accountId);

  if("error" in account || account.length === 0) {
    return errorResponseHandler('query-error', `cannot find the user account`, '/account/delete');
  }

  const result = await deleteAccountQuery(accountId);

  if("error" in result) {
    return errorResponseHandler('query-error', 'cannot delete the account if the user exist', '/account/delete')
  }

  const existAccount = await findAccountById(accountId);

  if("error" in existAccount || existAccount.length !== 0) {
    return errorResponseHandler('query-error', `cannot delete the account`, '/accounts/delete');
  }

  return successResponseHandler(existAccount);
}

export {
  handleDeleteAccount
}