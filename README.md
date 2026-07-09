# Personal RSS Feed

A tiny GitHub Actions-powered RSS feed for links you want to send to yourself.

## Feed URL

Subscribe to:

```text
https://pupontech.github.io/personal-rss/feed.xml
```

## Best ways to add articles

### 1. Bookmarklet — created, best desktop/browser flow

Install page:

```text
https://pupontech.github.io/personal-rss/bookmarklet.html
```

Drag the **Send to RSS** button to your bookmarks bar. When you are on an article page, click it. It opens a prefilled GitHub issue with the current URL, page title, and any selected text as notes. Click **Submit new issue**.

### 2. Ask Hermes to add it — works when Hermes has GitHub access

Send a message like:

```text
add this to RSS: https://example.com/article
```

Hermes can add it by creating a GitHub issue, triggering the workflow, or directly updating `items.json` and pushing.

### 3. GitHub issue form — already works

1. Open this repo on GitHub.
2. Go to **Issues** → **New issue**.
3. Choose **Add article to RSS feed**.
4. Paste the article URL, optionally add a title and notes, then submit.
5. GitHub Actions appends the item to `items.json`, regenerates `docs/feed.xml`, comments with the feed URL, and closes the issue.

### 4. GitHub Actions manual run — created

Use this when you want to add a URL without opening an issue.

1. Open **Actions** in this repo.
2. Choose **Build personal RSS feed**.
3. Click **Run workflow**.
4. Fill `url`, optionally `title` and `notes`.
5. Run it. The workflow updates the feed.

### 5. Email — possible, not built yet

GitHub does not provide a simple native "email this into a repo workflow" address. To do this you need a bridge such as Gmail Apps Script, Zapier, Make, Pipedream, IFTTT, or n8n.

Suggested setup:

```text
Email to special address or label
→ automation extracts first URL/title/body
→ automation calls GitHub Actions workflow_dispatch or creates a GitHub issue
→ RSS workflow updates feed
```

This requires storing a GitHub token in the automation service. Pick the provider first, then wire it up.

### 6. Telegram — possible, not built yet

Best chat-based option if you want messaging intake.

Suggested setup:

```text
Telegram bot receives URL
→ webhook/automation service parses message
→ GitHub API triggers workflow_dispatch or creates an issue
→ RSS workflow updates feed
```

Requires a Telegram bot token and a GitHub token stored in the webhook/automation service.

### 7. WhatsApp — possible, but highest-friction

WhatsApp usually needs WhatsApp Cloud API, Twilio WhatsApp, or another WhatsApp Business/API bridge.

Suggested setup:

```text
WhatsApp message to bot/number
→ WhatsApp provider webhook
→ GitHub API triggers workflow_dispatch or creates an issue
→ RSS workflow updates feed
```

This is doable, but overkill unless WhatsApp is mandatory.

### 8. Phone share sheet — possible, not built yet

For mobile, the clean version is an iOS Shortcut or Android automation that opens the same prefilled GitHub issue URL the bookmarklet uses.

Tell Hermes your phone platform and it can create the shortcut instructions.

## Privacy note

This repo/feed is intended for non-sensitive links. GitHub Pages feeds are public unless you are using a private Pages-capable GitHub plan/configuration.
