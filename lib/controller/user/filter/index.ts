import { URLParams } from "../../../queries/url";
import { findUsersByParams, UserQueryParam } from "../../../queries/user";

export const filterUser = async (params: URLParams[]) => {
  const keys = params.map(field => field.key) as UserQueryParam[];
  const values = params.map(field => field.value);

  const result = await findUsersByParams(keys, values);
  return result;
  
}