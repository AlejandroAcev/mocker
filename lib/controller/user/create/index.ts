import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { findUser, insertUser } from '../../../helper/user';
import { NewUser, User } from '../../../models/user';
import { getDefaultAccount } from '../../../helper/account';

export const createUser = async (userForm: NewUser) => {

  const emptyFields = Object.keys(userForm).filter(field => userForm[field] === undefined);

  if (emptyFields.length > 0) {
    return {error: `The fields cannot be empty: ${emptyFields.toString()}`}
  }

  // Check if exist user
  const existUser = !!(await findUser(userForm.email));

  if (!existUser) {
    const defaultAccount = await getDefaultAccount();
    const now = new Date().toISOString();
    const user: User = {
      id: uuidv4(),
      account_id: defaultAccount.id,
      total_endpoints_created: 0,
      endpoints_active: 0,
      created_at: now,
      updated_at: now,
      ...userForm
    }
    const result = await insertUser(user);
    return result;
  }

  return {error: 'The email already exists'}
}

export async function validatePassword(user, inputPassword) {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
        .toString('hex');
    const passwordsMatch = user.hash === inputHash;
    return passwordsMatch;
}