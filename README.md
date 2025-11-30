
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

1. Run the automated deploy script:
   `npm run deploy`
   - This builds the project and uses `gh-pages` to publish `dist/` to the `gh-pages` branch.
   - The `public/CNAME` file ensures GitHub keeps the `humblebrag.btrbot.com` custom domain.
2. In the GitHub repo settings → Pages, confirm Source = `gh-pages` (root) and the custom domain is set to `humblebrag.btrbot.com`.  
3. Ensure DNS for `humblebrag.btrbot.com` points to GitHub Pages (CNAME → `mctar.github.io`).  

Once DNS propagates, the static build will load from GitHub Pages while calling `https://api.btrbot.com/v1/chat/completions` directly from the browser.
