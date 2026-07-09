import fs from "node:fs";
import path from "node:path";

const itemsPath = "items.json";
const docsDir = "docs";

const items = fs.existsSync(itemsPath)
  ? JSON.parse(fs.readFileSync(itemsPath, "utf8"))
  : [];

const repoFull = process.env.GITHUB_REPOSITORY || "USERNAME/REPO";
const [owner, repo] = repoFull.split("/");

const ownerLower = owner.toLowerCase();
const repoLower = repo.toLowerCase();

const defaultBaseUrl =
  repoLower === `${ownerLower}.github.io`
    ? `https://${owner}.github.io`
    : `https://${owner}.github.io/${repo}`;

const siteUrl = process.env.FEED_SITE_URL || defaultBaseUrl;
const feedUrl = `${siteUrl.replace(/\/$/, "")}/feed.xml`;

const feedTitle = process.env.FEED_TITLE || "My Personal Article Feed";
const feedDescription = process.env.FEED_DESCRIPTION || "Articles I send to myself";
const feedLanguage = process.env.FEED_LANGUAGE || "en";

function xmlEscape(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function rfc822(date) {
  return new Date(date).toUTCString();
}

const latestDate = items[0]?.date || new Date().toISOString();

const rssItems = items
  .map((item) => {
    const description = item.notes || item.url;

    return `    <item>
      <title>${xmlEscape(item.title || item.url)}</title>
      <link>${xmlEscape(item.url)}</link>
      <guid isPermaLink="false">${xmlEscape(item.id || item.url)}</guid>
      <pubDate>${rfc822(item.date || new Date().toISOString())}</pubDate>
      <description>${xmlEscape(description)}</description>
    </item>`;
  })
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(feedTitle)}</title>
    <link>${xmlEscape(siteUrl)}</link>
    <atom:link href="${xmlEscape(feedUrl)}" rel="self" type="application/rss+xml" />
    <description>${xmlEscape(feedDescription)}</description>
    <language>${xmlEscape(feedLanguage)}</language>
    <lastBuildDate>${rfc822(latestDate)}</lastBuildDate>
${rssItems}
  </channel>
</rss>
`;

const index = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${xmlEscape(feedTitle)}</title>
    <link rel="alternate" type="application/rss+xml" title="${xmlEscape(feedTitle)}" href="feed.xml">
  </head>
  <body>
    <h1>${xmlEscape(feedTitle)}</h1>
    <p>${xmlEscape(feedDescription)}</p>
    <p><a href="feed.xml">RSS feed</a></p>
    <ul>
      ${items
        .map(
          (item) =>
            `<li><a href="${xmlEscape(item.url)}">${xmlEscape(
              item.title || item.url
            )}</a></li>`
        )
        .join("\n      ")}
    </ul>
  </body>
</html>
`;

fs.mkdirSync(docsDir, { recursive: true });
fs.writeFileSync(path.join(docsDir, "feed.xml"), rss);
fs.writeFileSync(path.join(docsDir, "index.html"), index);
