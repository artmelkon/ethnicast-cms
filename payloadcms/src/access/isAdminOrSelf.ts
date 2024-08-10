import { Access } from "payload/config";

import { checkUserRoles } from "../utilities/checkUserRoles";

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    // if (user.roles?.includes('admin')) {
    //   return true;
    // }
    if (checkUserRoles(['admin'], user)) return true;

    // If any other type of user, only provide access to themselves
    return {
      id: {
        equals: user.id,
      }
    }
  }

  // Reject everyone else
  return false;
}
