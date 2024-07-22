import { FieldAccess } from 'payload/types';
import { User } from 'payload/generate-types';

export const isAdmin = ({ req: { user } }) => Boolean(user?.roles?.includes('admin'));

export const isAdminFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'));
}
