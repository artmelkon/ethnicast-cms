import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

import { hashPassword, matchPassword } from '@lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  // console.log('server session ', session?.user?.token)
  // if (!session) {
  //   res.status(401).json({ message: "You must be loggedin!" })
  // }

  if (req.method !== 'POST') return null;

  console.log('req body ', req.body)

  // const userEmail = session?.user?.user?.email;
  // const oldPassword = req.body.oldPassword;
  // const newPassword = req.body.newPassword;


  // console.log('user email ', userEmail)
  // console.log('user oldPassword ', oldPassword)

  // const userData = await fetch(`${process.env.CMS_URI}/api/users?where[email][equals]=${userEmail}`, {
  //   method: 'GET',
  //   headers: {
  //     cookie: `lng=en;payload-token-${session?.user?.token}`
  //   },
  //   credentials: 'include'
  // })
  // const user = await userData.json();
  // const currentPassword = user.password;
  // console.log('curent password ', currentPassword)

  // const isPasswordMatch = await matchPassword(oldPassword, )

  // const result = await fetch(`${process.env.CMS_URI}/api/users?where[email][equals]=${userEmail}`, {
  //   method: 'p',
  //   headers: {
  //     cookie: `lng=en;payload-token=${session?.user?.token}`
  //   },
  //   credentials: 'include',
  //   body: {JSON.strategy({password: newHasedPassword})}
  // });
  // console.log('user data ', await result.json())


  // const result = await fetch(`${process.env.CMS_URI}/api/users/forgot-password`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     email: userEmail,
  //   }),
  // })

  // const user = await result.json()

  // console.log('forgot password token', user)

  // const result = await fetch(`${process.env.CMS_URI}/api/users/reset-password`, {
  //   method: 'POST',
  //   headers: {
  //     cookie: `lng=en;payload-token=${session?.user?.token}`
  //   },
  //   credentials: 'include',
  //   body: JSON.stringify({
  //     token: session?.user?.token,
  //     password: newPassword
  //   })
  // });
  // console.log('user data ', await result.json())
}
