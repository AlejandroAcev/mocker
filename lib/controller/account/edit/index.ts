import { Account } from "../../../models/account";
import { findPlanById } from "../../../queries/plan";
import { findAccountById, updateAccountQuery } from "../../../queries/account";
import { errorResponseHandler } from "../../response/error";
import { successResponseHandler } from "../../response/success";
import { Plan } from "../../../models/plan";

const getCurrentAndNewPlan = async (currentPlanId: string, newPlanId: string): Promise<Plan[]> => {
  const currentPlan = await findPlanById(currentPlanId);

  if(currentPlanId === newPlanId) {
    return [currentPlan];
  }

  const newPlan = await findPlanById(newPlanId);
  return [currentPlan, newPlan];
}

const handleAccountUpdate = async (newAccount: Account, currentAccount: Account) => {

  const [currentPlan, newPlan] = await getCurrentAndNewPlan(currentAccount.plan_id, newAccount.plan_id);

  const differenceBetweenPlans = newPlan ? newPlan.limit_request_per_day : 0;
  const newRequestNextLimit = currentAccount.request_next_limit + differenceBetweenPlans;
  const planType = newPlan ? newPlan.type : currentPlan.type;

  const newAccountData: Account = {
    ...newAccount,
    type: planType,
    request_next_limit: newRequestNextLimit,
  }
  
  const accountUpdated = await updateAccountQuery(newAccountData);

  if(accountUpdated['affectedRows'] !== 1) {
    return errorResponseHandler('query-error', 'the account cannot be updated', '/account/edit');
  }

  const newAccountUpdated = await findAccountById(newAccountData.id);

  if("error" in newAccountUpdated) {
    return errorResponseHandler('query-error', 'cannot load the new user data', '/account/edit');
  }

  return successResponseHandler(newAccountUpdated);
}

export {
  handleAccountUpdate
}