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

const findAccount = async (email: string) => {
  try {
    const result = await excuteQuery({
        query: 'SELECT * FROM users WHERE email = ?',
        values: [ email ],
    });
    
    return result[0] || null;

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
    return result as Account[];

  } catch (error) {
      console.log('---> Query error: ', error);
      const test = errorResponseHandler('query-error', error, '/users');
      return test;
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
    return result as Account[];

  } catch (error) {
      console.error('-> Query error: ', error);
      const errorResult = errorResponseHandler('query-error', error, '/accounts');
      return errorResult;
  }
}


const insertAccount = async (account: Account) => {
  
  try {
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
        account.endpoints,
        account.users,
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

const deleteAccountQuery = async (accountId: string) => {
  try {
    const result = await excuteQuery({
      query: `DELETE FROM accounts WHERE id = ?`,
      values: [accountId]
    });
    
    return result;

  } catch (error) {
    console.error('-> Query error: ',  error );
    const errorResult = errorResponseHandler('query-error', error, '/users/update');
    return errorResult;
  }
}


export {
  findAccount,
  findAccountById,
  insertAccount,
  getDefaultAccount,
  findAccountByParams,
  deleteAccountQuery
}