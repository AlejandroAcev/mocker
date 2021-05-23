import type { NextApiRequest, NextApiResponse } from 'next';
import { handleFilterPlans } from '../../../lib/controller/plan/filter';
import { errorResponseHandler } from '../../../lib/controller/response/error';
import { successResponseHandler } from '../../../lib/controller/response/success';
import { getAllPlansQuery, plansQueryParams } from '../../../lib/queries/plan';
import { getUrlParams } from '../../../lib/queries/url';

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {  
  const url = req.url;

  if (req.method !== 'GET') {
    return res.status(400).json(errorResponseHandler('bad-request')); 
  }

  const validPlansParams = getUrlParams(url, [...plansQueryParams]);

  if(validPlansParams.length === 0){
    const result = await getAllPlansQuery();
    return res.status(200).json(successResponseHandler(result));
  }

  const result = await handleFilterPlans(validPlansParams);

  if("error" in result){
    return res.status(400).json(result);
  }

  return res.status(200).json(successResponseHandler(result));
}

export default handleRequest;