import { User } from 'payload/generate-types';

export const checkUserRoles = (allRoles: string[], user: User): boolean => {
  if (user) {
    if (
      allRoles.some(role => {
        return user.roles && user?.roles?.some(individualRole => individualRole === role)
      })
    )
      return true
  }
  return false
}
