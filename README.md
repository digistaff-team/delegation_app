<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/14qSvy-wlf3mKLNRbi3atUYH-fpXqW3vu

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Vercel Deployment

Set the following environment variables in Vercel (Project Settings → Environment Variables):

- `VITE_PROTALK_BOT_TOKEN`
- `VITE_PROTALK_BOT_ID`

Then deploy normally. The app builds with `npm run build` and outputs to `dist/`.
