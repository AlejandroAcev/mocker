import type { NextApiRequest, NextApiResponse } from 'next';
import { filterUser } from '../../../lib/controller/user/filter';
import { errorResponseHandler } from '../../../lib/controller/response/error';
import { getUrlParams } from '../../../lib/queries/url';
import { successResponseHandler } from '../../../lib/controller/response/success';
import { isInArray } from '../../../lib/util';
import { userQueryParams } from '../../../lib/queries/user';

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.url;
  
  if (req.method !== 'GET') {
    return res.status(400).json(errorResponseHandler('bad-request')); 
  }

  const params = getUrlParams(url);
  const validUserFilters = params.filter(field => isInArray(field.key, userQueryParams));

  if(validUserFilters.length === 0){
    return res.status(400).json(errorResponseHandler('bad-request', 'the params are not valid', url)); 
  }

  const result = await filterUser(validUserFilters);

  if("error" in result){
    return res.status(400).json(result);
  }

  return res.status(200).json(successResponseHandler(result));
}

export default handleRequest;