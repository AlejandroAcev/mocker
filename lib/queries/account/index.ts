import excuteQuery from "../../db/db-connection";
import { Account } from "../../models/account";

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
          created_at,
          updated_at
        ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        account.created_at,
        account.updated_at
      ]
    });
    
    return result;

  } catch (error) {
    console.log( error );
    return {error: 'ERROR AL INSERTAR LA CUENTA'};
  }
}

export {
  findAccount,
  insertAccount,
  getDefaultAccount
}