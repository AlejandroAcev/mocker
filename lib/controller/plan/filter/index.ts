import { URLParams } from "../../../queries/url";
import { findPlanByParams, PlansQueryParam } from "../../../queries/plan";

export const handleFilterPlans = async (params: URLParams[]) => {
  const keys = params.map(field => field.key) as PlansQueryParam[];
  const values = params.map(field => field.value);

  const result = await findPlanByParams(keys, values);
  return result;
}