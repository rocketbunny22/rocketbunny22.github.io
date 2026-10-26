# Publishing a blog post

Add a Markdown file to `content/blog` with a lowercase, hyphenated filename such as `my-security-research.md`.

```md
---
title: "Post title"
description: "A short summary used on the blog index and in search metadata."
date: "2026-10-20"
tags:
  - Security
  - Research
---

Write the article in Markdown here.
```

Commit and push the file to `main`. GitHub Actions will build and publish it to Cloudflare Pages automatically. Start sections with `##`; the article template already renders the title as the main heading. Put images in `public/images` and refer to them as `/images/filename.webp`. The sitemap updates automatically, and an empty blog is not indexed until the first article is published.
