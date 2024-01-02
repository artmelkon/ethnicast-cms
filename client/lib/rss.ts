import Parser from "rss-parser";
const rssParser = new Parser();

export async function parseRss(rssfeed) {
  return await rssParser.parseURL(rssfeed);
}
