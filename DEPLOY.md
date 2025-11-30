# HumbleBrag Slider Deployment Recipe

Use this checklist whenever you ship an update.

## 0. Prereqs
- Repo: `git@github.com:mctar/humblebrag-slider.git`
- Default branch: `main`
- Pages branch: `gh-pages`
- Custom domain: `humblebrag.btrbot.com`
- Node.js 18+ installed

## 1. Update + Test Locally
1. Pull latest `main`:
   ```bash
   git checkout main
   git pull
   ```
2. Install deps (first time or after package changes):
   ```bash
   npm install
   ```
3. Run dev server if you want to test:
   ```bash
   npm run dev
   ```

## 2. Commit + Push Main
1. Add/commit your changes:
   ```bash
   git add .
   git commit -m "Describe update"
   git push origin main
   ```

## 3. Deploy to GitHub Pages
1. Run the one-liner:
   ```bash
   npm run deploy
   ```
   This builds the project and publishes `dist/` to the `gh-pages` branch via the `gh-pages` CLI.

## 4. Post-Deploy Checks
- GitHub → Settings → Pages: confirm Source=`gh-pages` / root.
- Confirm custom domain still shows `humblebrag.btrbot.com`.
- Visit https://humblebrag.btrbot.com, open devtools → Network and check requests hit `https://api.btrbot.com/v1/chat/completions`.
- Optional: run `dig humblebrag.btrbot.com` if DNS issues arise.

## 5. Notes
- `.env` / secrets stay local; never commit them.  
- Re-run steps 1–3 for every release.  
- If you want to automate step 3, replace it with a GitHub Action or `gh-pages` npm script, but keep this manual flow as a fallback.
