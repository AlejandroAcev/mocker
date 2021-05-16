import excuteQuery from "../../db/db-connection";
import { Account } from "../../models/account";
import { Plan } from "../../models/plan";

const getDefaultPlan = async (): Promise<Account> => {
  try {
    const result = await excuteQuery({
        query: 'SELECT * FROM plans WHERE default_plan = 1',
        values: [],
    });
    
    return result[0];

  } catch (error) {
      console.error('-> Query error: ', error);
      return null;
  }
}

const findPlan = async (id: string) => {
  try {
    const result = await excuteQuery({
        query: 'SELECT * FROM plans WHERE id = ?',
        values: [ id ],
    });
    
    return result[0] || null;

  } catch (error) {
      console.error('-> Query error: ', error);
      return null;
  }
}

export {
  findPlan,
  getDefaultPlan
}