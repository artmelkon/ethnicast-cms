import Parser from 'rss-parser';

import { Podcast } from 'payload/generated-types'
const rssParser = new Parser();

type PodcastType = {
  feedUrl: Podcast[]
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { feedUrl } = req.body;
    const feedData = await rssParser.parseURL(feedUrl);

    const email = feedData.itunes?.owner?.email;
    if (!email) res.status(400).json({ message: "No Email provided!" })

    const data = {
      title: feedData.title,
      creator: feedData.creator,
      link: feedData.link,
      feedUrl,
      description: feedData.description,
      image: {
        link: feedData.image?.link,
        url: feedData.image?.url,
        title: feedData.image?.title
      },
      author: feedData.author,
      paginationLink: {
        self: feedData.paginationLinks?.self
      }
    }
    console.log(data);
    await fetch(`${process.env.CMS_URI}/api/podcasts`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    res.status(200).json({ message: 'The post was a Success!' })
  }
}
