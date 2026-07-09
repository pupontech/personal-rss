# Personal RSS Feed

A tiny GitHub Actions-powered RSS feed for links you want to send to yourself.

## Feed URL

After GitHub Pages is enabled, subscribe to:

```text
https://pupontech.github.io/personal-rss/feed.xml
```

## Add an article

1. Open this repo on GitHub.
2. Go to **Issues** → **New issue**.
3. Choose **Add article to RSS feed**.
4. Paste the article URL, optionally add a title and notes, then submit.
5. GitHub Actions appends the item to `items.json`, regenerates `docs/feed.xml`, comments with the feed URL, and closes the issue.

## Privacy note

This repo/feed is intended for non-sensitive links. GitHub Pages feeds are public unless you are using a private Pages-capable GitHub plan/configuration.
