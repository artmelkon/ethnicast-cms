import { Access } from "payload/config";

export const isAdminOrContributorOrPublished: Access = ({ req: { user } }) => {
  // User must be logged in to and data nust not be null or undefined
  if (user) {
    if (user.roles.includes('admin')) return true;

    if (user.roles.includes('contributor') && user.profiles?.length > 0) {
      return {
        or: [{
          profile: {
            in: user.profiles
          },
        },
        {
          profile: {
            exists: false
          }
        }]
      }
    }
  }

  return {
    _status: {
      equals: 'published'
    }
  }
}
