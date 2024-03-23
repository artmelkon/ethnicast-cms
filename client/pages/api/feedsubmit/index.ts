import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { parseRss } from "../../../lib/rss";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions)
    console.log('server session ', session?.user?.token)
  if (!session) {
    res.status(401).json({ message: "You must be loggedin!" })
  }

  if (req.method === "POST") {
    const { feedUrl, language, genre } = req.body;
    console.log('feed url', req.body)
    const feedData = await parseRss(feedUrl);

    const email = feedData.itunes?.owner?.email;
    if (!email) res.status(400).json({ message: "No Email provided!" });

    const data = {
      title: feedData.title,
      creator: feedData.creator,
      link: feedData.link,
      feedUrl,
      description: feedData.description,
      image: {
        link: feedData.image?.link,
        url: feedData.image?.url,
        title: feedData.image?.title,
      },
      author: feedData.author,
      paginationLink: {
        self: feedData.paginationLinks?.self,
      },
      language,
      genre
    };
    // console.log(data);
    await fetch(`${process.env.CMS_URI}/api/podcasts`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        cookie: `lng=en;payload-token=${session?.user?.token}`
      },
      credentials: 'include',
    });
    res.status(200).json({ message: "The post was a Success!" });
  }
}
