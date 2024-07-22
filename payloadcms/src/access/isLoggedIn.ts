import { Access } from "payload/config";
import { User } from "../../../client/payload-types";

export const isLoggedIn: Access<any, User> = ({ req: { user } }) => {
  // Return true if user is logged in, false if not
  console.log('is user logged in: ', Boolean(user))
  return Boolean(user);
}
