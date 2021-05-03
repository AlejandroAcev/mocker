import excuteQuery from "../../db/db-connection";
import { Account } from "../../models/account";

const getDefaultAccount = async (): Promise<Account | null> => {
  try {
    const result = await excuteQuery({
        query: 'SELECT * FROM accounts WHERE name = "test"',
        values: [],
    });
    
    return result[0] || null;

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

export {
  findAccount,
  getDefaultAccount
}