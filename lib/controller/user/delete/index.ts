import { User } from "../../../models/user"
import { findUserById, deleteUserQuery } from "../../../queries/user"
import { errorResponseHandler } from "../../response/error";
import { successResponseHandler } from "../../response/success"

const handleDeleteUser = async (user: User) => {
  
  const userUpdated = await deleteUserQuery(user);

  if(userUpdated['affectedRows'] !== 1) {
    return errorResponseHandler('query-error', 'the user cannot be deleted', '/users/edit');
  }

  const userDeleted = await findUserById(user.id);

  if("error" in userDeleted) {
    return errorResponseHandler('query-error', 'cannot load the user data', '/users/edit');
  }

  return successResponseHandler(userDeleted);
}

export {
  handleDeleteUser
}