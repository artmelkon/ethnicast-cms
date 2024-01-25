import { NextApiRequest, NextApiResponse } from "next";

import { parseRss } from "../../../lib/rss";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { feedUrl } = req.body;
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
    };
    // console.log(data);
    await fetch(`${process.env.CMS_URI}/api/podcasts`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.status(200).json({ message: "The post was a Success!" });
  }
}
