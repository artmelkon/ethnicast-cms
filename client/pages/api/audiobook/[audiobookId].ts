import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { redirect } from "next/dist/server/api-utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  // const token = req.cookies['next-auth.session-token'];
  console.log('api cookies: ', req.cookies['next-auth.session-token'])
  console.log('api user: ', session?.user)
  const token = session?.user?.token;
  // console.log('cookies: ', token)
  try {
    const result = await fetch(`${process.env.CMS_URI}/api/audiobooks/${req.query.audiobookId}?depth=1`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      }
    })
    const audiobook = await result.json();
    res.status(200).json(audiobook)
  }
  catch (err) {
    console.error(err)
  }
}
