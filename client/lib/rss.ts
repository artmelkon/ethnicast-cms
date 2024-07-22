import Parser from "rss-parser";
const rssParser = new Parser();

export async function parseRss(rssfeed: any) {
  return await rssParser.parseURL(rssfeed);
}
