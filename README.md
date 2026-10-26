# Derek Nolt portfolio

This Next.js site exports static files for Cloudflare Pages. Original page content is retained in `content/pages.json`; styles and scripts are in `public`. The original HTML files remain in the repository while the GitHub Pages site is still active.

Use Node 22.16 or later. Run `npm ci`, `npm run dev`, `npm run lint`, or `npm run build`. The build is written to `out`.

Publish Markdown articles by following [the blog publishing guide](content/README.md).

Pushes to `main` run `.github/workflows/deploy.yml`, which builds and deploys to the `derek-portfolio` Cloudflare Pages project. Add a GitHub Actions repository secret named `CLOUDFLARE_API_TOKEN` containing a Cloudflare API token with Pages edit access to this account. The workflow can also be run manually from the Actions tab. The custom domain is `derek.groundedcyber.com`.

The original site contains a home-lab placeholder and legacy service links that should be reviewed.
