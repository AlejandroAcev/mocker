import { errorResponseHandler } from "../../controller/response/error";
import excuteQuery from "../../db/db-connection";
import { Plan } from "../../models/plan";
import { ErrorResponse } from "../../models/response";

export const plansQueryParams = [
  'id',
  'name',
  'type',
  'level',
  'users_allowed',
  'request_allow',
  'endpoints_allowed',
  'limit_request_per_day',
  'default_plan'
] as const;
export type PlansQueryParam = typeof plansQueryParams[number];


const getDefaultPlan = async (): Promise<Plan> => {
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

const getAllPlansQuery = async (): Promise<Plan[]> => {
  try {
    const result = await excuteQuery({
        query: 'SELECT * FROM plans',
        values: [],
    });
    
    return result as Plan[];

  } catch (error) {
      console.error('-> Query error: ', error);
      return null;
  }
}


const findPlanById = async (id: string): Promise<Plan | null> => {
  try {
    const result = await excuteQuery({
        query: 'SELECT * FROM plans WHERE id = ?',
        values: [ id ],
    });
    
    return result[0];

  } catch (error) {
      console.error('-> Query error: ', error);
      return null;
  }
}

const findPlanByParams = async (queryParams: PlansQueryParam[], params: string[], isExact: boolean = false): Promise<Plan[] | ErrorResponse> => {
  try {    
    const filterParamsList = queryParams.map(filter => `${filter} LIKE ?`).join(' AND ');
    
    const query = `SELECT * FROM plans WHERE ${filterParamsList}`;
    const values = [...params.map(param => `%${param}%`)]
    const result = await excuteQuery({
      query,
      values,
    });
    return result as Plan[];

  } catch (error) {
      console.error('-> Query error: ', error);
      const errorResult = errorResponseHandler('query-error', error, '/accounts');
      return errorResult;
  }
}

export {
  findPlanById,
  getDefaultPlan,
  getAllPlansQuery,
  findPlanByParams,
}