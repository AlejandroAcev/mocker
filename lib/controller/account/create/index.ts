import { v4 as uuidv4 } from 'uuid';
import { insertAccount } from '../../../queries/account';
import { getDefaultPlan } from '../../../queries/plan';
import { Account, NewAccount } from '../../../models/account';

const createAccount = async (userId: string, newAccount?: NewAccount): Promise<Account> => {
  const defaultPlan = await getDefaultPlan();

  const accountId = uuidv4();
  const account: Account = {
    id: accountId,
    plan_id: defaultPlan.id,
    endpoints_active: 0,
    endpoints_created: 0,
    request_completed: 0,
    request_next_limit: 0,
    endpoints: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: newAccount?.name || accountId,
    type: newAccount?.type || 'personal',
    users: [userId],
  }

  const result = await insertAccount(account);
  return !!result && account;

}

export {
  createAccount
}