import { v4 as uuidv4 } from 'uuid';
import { findUsersByParams, insertUser } from '../../../queries/user';
import { NewUser, User } from '../../../models/user';
import { createAccount } from '../../account/create';
import { errorResponseHandler } from '../../response/error';

export const createUser = async (userForm: NewUser) => {

  const userResult = await findUsersByParams(['email'], [userForm.email]);

  if (userResult['length'] > 0) {
    return errorResponseHandler('email-exists', undefined, '/users/create');
  }

  const userId = uuidv4();
  const newAccount = await createAccount(userId);
  const now = new Date().toISOString();
  const user: User = {
    id: userId,
    account_id: newAccount.id,
    total_endpoints_created: 0,
    endpoints_active: 0,
    created_at: now,
    updated_at: now,
    ...userForm
  }
  
  const result = await insertUser(user);
  return !!result && user;
}