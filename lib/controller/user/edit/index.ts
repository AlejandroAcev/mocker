import { User } from "../../../models/user"
import { findUserById, updateUserQuery } from "../../../queries/user"
import { errorResponseHandler } from "../../response/error";
import { successResponseHandler } from "../../response/success"

const handleUpdateUser = async (user: User) => {
  
  const userUpdated = await updateUserQuery(user);

  if(userUpdated['affectedRows'] !== 1) {
    return errorResponseHandler('query-error', 'the user cannot be updated', '/users/edit');
  }

  const newUserData = await findUserById(user.id);

  if("error" in newUserData) {
    return errorResponseHandler('query-error', 'cannot load the new user data', '/users/edit');
  }

  return successResponseHandler(newUserData);
}

export {
  handleUpdateUser
}