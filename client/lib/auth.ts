import {hash, compare} from 'bcrypt';

export async function hashPassword(password: string) {
  const saltRounds: number = 12;
  return await hash(password, saltRounds);
}

export async function matchPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword)
}
