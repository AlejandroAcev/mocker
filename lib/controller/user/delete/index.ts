import { User } from "../../../models/user"
import { findUserById, deleteUserQuery } from "../../../queries/user"
import { handleDeleteAccount } from "../../account/delete";
import { errorResponseHandler } from "../../response/error";
import { successResponseHandler } from "../../response/success"

const handleDeleteUser = async (user: User) => {
  
  const userUpdated = await deleteUserQuery(user);

  if(userUpdated['affectedRows'] !== 1) {
    return errorResponseHandler('query-error', 'the user cannot be deleted', '/users/delete');
  }

  const userDeleted = await findUserById(user.id);
  const userAccountDeleted = await handleDeleteAccount(user.account_id);

  if("error" in userDeleted || "error" in userAccountDeleted) {
    return errorResponseHandler('query-error', 'cannot load the user data', '/users/delete');
  }

  return successResponseHandler(userDeleted);
}

export {
  handleDeleteUser
}