import { errorResponseHandler } from "../../controller/response/error";
import excuteQuery from "../../db/db-connection";
import { Account } from "../../models/account";
import { ErrorResponse } from "../../models/response";

export const accountQueryParams = [
  'id',
  'name',
  'type',
  'users',
  'plan_id',
  'endpoints',
  'created_at',
  'updated_at',
] as const;
export type AccountsQueryParam = typeof accountQueryParams[number];

const formatAccounts = (accounts: Account[]): Account[] =>
  accounts.map(account => {
    const endpoints = String(account.endpoints).split(', ');
    return {
      ...account,
      users: String(account.users).split(', '),
      endpoints: endpoints[0] === '' ? [] : endpoints,
    }
  });

const getDefaultAccount = async () => {
  try {
    const result = await excuteQuery({
        query: 'SELECT * FROM accounts WHERE default_plan = 1',
        values: [],
    });
    
    return result[0];

  } catch (error) {
      console.log(error);
      return null;
  }
}

const findAccountById = async (id: string): Promise<Account[] | ErrorResponse> => {
  try {
    const result = await excuteQuery({
        query: `SELECT * FROM accounts WHERE id = ?`,
        values: [id],
    });
    const accounts = formatAccounts(result as Account[]);
    return accounts;

  } catch (error) {
      console.log('---> Query error: ', error);
      const errorResult = errorResponseHandler('query-error', error, '/accounts/id');
      return errorResult;
  }
}

const findAccountByParams = async (queryParams: AccountsQueryParam[], params: string[], isExact: boolean = false): Promise<Account[] | ErrorResponse> => {
  try {    
    const filterParamsList = queryParams.map(filter => `${filter} LIKE ?`).join(' AND ');
    
    const query = `SELECT * FROM accounts WHERE ${filterParamsList}`;
    const values = [...params.map(param => `%${param}%`)]
    const result = await excuteQuery({
      query,
      values,
    });
    const accounts = formatAccounts(result as Account[]);
    return accounts;

  } catch (error) {
      console.error('-> Query error: ', error);
      const errorResult = errorResponseHandler('query-error', error, '/accounts');
      return errorResult;
  }
}

const insertAccount = async (account: Account) => {
  try {
    const endpoints = account.endpoints.join(', ') === '' ? '' : account.endpoints.join(', ');
    const result = await excuteQuery({
      query: `INSERT INTO accounts (
          id,
          name,
          type,
          plan_id,
          endpoints_active,
          endpoints_created,
          request_completed,
          request_next_limit,
          endpoints,
          users,
          created_at,
          updated_at
        ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      values: [
        account.id,
        account.name,
        account.type,
        account.plan_id,
        account.endpoints_active,
        account.endpoints_created,
        account.request_completed,
        account.request_next_limit,
        endpoints,
        account.users.join(', '),
        account.created_at,
        account.updated_at
      ]
    });
    
    return result;

  } catch (error) {
    console.error('-> Query error: ',  error );
    return errorResponseHandler('query-error', error, '/account/create');
  }
}

const updateAccountQuery = async (account: Account) => {
  try {
    const result = await excuteQuery({
      query: `UPDATE accounts
        SET 
          name = ?,
          type = ?,
          plan_id = ?,
          request_next_limit = ?,
          users = ?,
          endpoints = ?
        WHERE id = ?`,
      values: [
        account.name,
        account.type,
        account.plan_id,
        account.request_next_limit,
        account.users.join(', '),
        account.endpoints.join(', '),
        account.id
      ],
    });
    
    return result;

  } catch (error) {
    console.error('-> Query error: ',  error );
    return errorResponseHandler('query-error', error, '/account/edit');
  }
}

const deleteAccountQuery = async (accountId: string) => {
  try {
    const result = await excuteQuery({
      query: `DELETE FROM accounts WHERE id = ?`,
      values: [accountId]
    });
    
    return result;

  } catch (error) {
    console.error('-> Query error: ',  error );
    const errorResult = errorResponseHandler('query-error', error, '/account/delete');
    return errorResult;
  }
}


export {
  findAccountById,
  insertAccount,
  getDefaultAccount,
  findAccountByParams,
  deleteAccountQuery,
  updateAccountQuery
}