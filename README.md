<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run the HumbleBrag Slider as a static web app.

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   `npm install`
2. (Optional) Create a `.env` (or `.env.local`) file in the repo root to override the hosted LLM endpoint or API key:

   ```bash
   VITE_BTRBOT_API_URL=https://api.btrbot.com/v1/chat/completions
   VITE_BTRBOT_API_KEY=not-needed
   VITE_BTRBOT_MODEL=qwen2.5:32b
   ```

   These defaults already point to `https://api.btrbot.com`, so you only need this file if you plan to proxy through a different tunnel or model.

3. Start the dev server:
   `npm run dev`

4. Build for production (outputs to `dist/`):
   `npm run build`

## Deploy to GitHub Pages (humblebrag.btrbot.com)

1. Run `npm run build`.  
2. Publish the `dist/` folder to the branch Pages is configured to serve from (e.g., `gh-pages` or `docs`).  
3. Ensure the `public/CNAME` file is included so the built site contains `humblebrag.btrbot.com` and GitHub Pages keeps the custom domain.  
4. In the GitHub repo settings → Pages, set the source branch/folder and configure the custom domain to `humblebrag.btrbot.com`.  
5. Point the DNS for `humblebrag.btrbot.com` to GitHub Pages (typically a CNAME to `<username>.github.io`).  

Once DNS propagates, the static build will load from GitHub Pages while calling `https://api.btrbot.com/v1/chat/completions` directly from the browser.
