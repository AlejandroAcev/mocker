import { v4 as uuidv4 } from 'uuid';
import { findUsersByParams, insertUser } from '../../../queries/user';
import { NewUser, User } from '../../../models/user';
import { createAccount } from '../../account/create';
import { errorResponseHandler } from '../../response/error';

export const createUser = async (userForm: NewUser) => {

  const email = userForm.email.toLowerCase();
  const userResult = await findUsersByParams(['email'], [email]);

  if ("error" in userResult || userResult.length > 0) {
    return errorResponseHandler('email-exists', undefined, '/users/create');
  }

  const userId = uuidv4();
  const newAccount = await createAccount(userId);
  const now = new Date().toISOString();
  const user: User = {
    id: userId,
    email: email,
    account_id: newAccount.id,
    total_endpoints_created: 0,
    endpoints_active: 0,
    is_verified: false,
    created_at: now,
    updated_at: now,
    ...userForm
  }
  
  const result = await insertUser(user);

  if(result['affectedRows'] !== 1 || "error" in result) {
    return errorResponseHandler('query-error', undefined, '/users/create');
  }

  return user;
}