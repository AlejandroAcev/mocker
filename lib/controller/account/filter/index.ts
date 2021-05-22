import { URLParams } from "../../../queries/url";
import { isInArray } from "../../../util";
import { findAccountByParams, AccountsQueryParam, accountQueryParams } from "../../../queries/account";

export const handlerFilterAccount = async (params: URLParams[]) => {
  const validFilterList = params.filter(field => isInArray(field.key, accountQueryParams));

  const keys = validFilterList.map(field => field.key) as AccountsQueryParam[];
  const values = validFilterList.map(field => field.value);

  const result = await findAccountByParams(keys, values);
  return result;
}