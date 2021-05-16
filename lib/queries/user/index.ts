import excuteQuery from "../../db/db-connection";
import { User } from "../../models/user";
import { errorResponseHandler } from "../../controller/response/error";
import { ErrorResponse } from "../../models/response";

export const userQueryParams = [
  'id',
  'email',
  'name',
  'user_id',
  'account_id',
] as const;
export type UserQueryParam = typeof userQueryParams[number];

const findUser = async (email: string) => {
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

const findUserById = async (id: string): Promise<User[] | ErrorResponse> => {
  try {
    const result = await excuteQuery({
        query: `SELECT * FROM users WHERE id = ?`,
        values: [id],
    });
    return result as User[];

  } catch (error) {
      console.log(error);
      const test = errorResponseHandler('query-error', error, '/users');
      return test;
  }
}

const findUsersByParams = async (queryParams: UserQueryParam[], params: string[], isExact: boolean = false): Promise<User[] | ErrorResponse> => {
  try {    
    const filterParamsList = queryParams.map(filter => `${filter} LIKE ?`).join(' AND ');
    
    const query = `SELECT * FROM users WHERE ${filterParamsList}`;
    const values = [...params.map(param => `%${param}%`)]
    const result = await excuteQuery({
      query,
      values,
    });
    return result as User[];

  } catch (error) {
      console.error('-> Query error: ', error);
      const errorResult = errorResponseHandler('query-error', error, '/users');
      return errorResult;
  }
}

const insertUser = async (user: User) => {
  try {
    const result = await excuteQuery({
      query: 'INSERT INTO users (id, name, email, date_of_birth, role, account_id, total_endpoints_created, endpoints_active, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      values: [user.id, user.name, user.email, user.date_of_birth, user.role, user.account_id, user.total_endpoints_created, user.endpoints_active, user.created_at, user.updated_at]
    });
    
    return result;

  } catch (error) {
    console.error('-> Query error: ',  error );
    const errorResult = errorResponseHandler('query-error', error, '/users/create');
    return errorResult;
  }
}

const updateUserQuery = async (user: User) => {
  try {
    const result = await excuteQuery({
      query: `UPDATE users
        SET
          name = ?,
          lastname = ?,
          date_of_birth = ?,
          role = ?
        WHERE id = ?`,
      values: [user.name, user.lastname, user.date_of_birth, user.role, user.id]
    });
    
    return result;

  } catch (error) {
    console.error('-> Query error: ',  error );
    const errorResult = errorResponseHandler('query-error', error, '/users/update');
    return errorResult;
  }
}

export {
  findUser,
  insertUser,
  updateUserQuery,
  findUserById,
  findUsersByParams
}