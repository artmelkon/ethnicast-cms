import { FieldAccess } from 'payload/types';
import { User } from 'payload/generate-types';
import { checkUserRoles } from '../utilities/checkUserRoles';

export const isAdmin = ({ req: { user } }) => Boolean(user.roles?.includes('admin'));

export const isAdminFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'));
}
