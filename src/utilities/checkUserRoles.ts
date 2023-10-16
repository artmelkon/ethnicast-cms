import { User } from 'payload/generate-types';

export const checkUserRoles = (allRoles: [], user: User): boolean => {
  if (user) {
    if (
      allRoles.some(role => {
        return user?.roles?.some(individualRole => {
          return individualRole === role
        })
      })
    )
      return true
  }
  return false
}
