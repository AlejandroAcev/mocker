import { URLParams } from "../../../queries/url";
import { isInArray } from "../../../util";
import { findUsersByParams, UserQueryParam, userQueryParams } from "../../../queries/user";

export const filterUser = async (params: URLParams[]) => {
  const validFilterList = params.filter(field => isInArray(field.key, userQueryParams));

  const keys = validFilterList.map(field => field.key) as UserQueryParam[];
  const values = validFilterList.map(field => field.value);

  const result = await findUsersByParams(keys, values);
  return result;

}