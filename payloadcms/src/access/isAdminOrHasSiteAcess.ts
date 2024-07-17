import { Access } from "payload/config";
import { checkUserRoles } from "../utilities/checkUserRoles";

export const isAdminOrHasSiteAccess = (siteIDFieldName: string = 'site'): Access => ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user.roles.includes('admin')) return true;

    // If user has role of 'editor' and has access to a site,
    // return a query constraint to restrict the documents this user can edit
    // to only those that are assigned to a site, or have no site assigned
    if (checkUserRoles(['contributor', 'subscriber'], user) && user.profiles?.length > 0) {
      // if (user.roles.includes('contributor') && user.profiles?.length > 0) {
      // console.log('user profile ', user.profiles)

      // Otherwise, we can restrict it based on the `site` field
      return {
        or: [
          {
            [siteIDFieldName]: {
              in: user.profiles
            }
          },
          {
            [siteIDFieldName]: {
              exists: false,
            }
          }
        ]
      }
    }
  }

  // Reject everyone else
  return false;
}
