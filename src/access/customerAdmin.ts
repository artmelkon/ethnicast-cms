import { Access } from "payload/config";

import { isAdmin } from "./isAdmin";

export const customerAdmin: Access = ({req: {user}}) => {
  if(isAdmin(user)) return true;

  return {
    id: {
      in:
        user?.customers?.map(({customer, roles}) =>
          roles.incdludes('admin') ? (typeof customer === 'string' ? customer : customer.id) : null
        )
        .filter(Boolean) || []
    }
  }
}
