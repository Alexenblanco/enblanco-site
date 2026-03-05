This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Sanity CMS

- **Install:** With Next.js 16 you may need `npm install --legacy-peer-deps` (next-sanity peer dependency targets Next 14/15).
- **Studio (decoupled):** Run `npm run studio` to start Sanity Studio (or `cd studio && npm run dev`). Configure `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local` (see `.env.local.example`).
- **Typed queries:** Run `npm run sanity:typegen` to generate TypeScript types from the studio schema into `src/lib/sanity/types.ts`. Run after changing schemas in `studio/schemas/`.
- **Preview (draft) mode:** Call `GET /api/draft/enable?secret=<SANITY_PREVIEW_SECRET>&redirect=/es` to enable draft mode, and `GET /api/draft/disable` to turn it off.
- **Revalidate cache (webhook):** To invalidate Next.js cache when content changes in Sanity, set a webhook in [Sanity Manage](https://www.sanity.io/manage):
  1. Project → API → Webhooks → Add webhook.
  2. **URL:** `https://<your-domain>/api/revalidate?secret=<SANITY_PREVIEW_SECRET>` (or use `SANITY_REVALIDATE_SECRET` if you set it).
  3. **Trigger:** on Create, Update, Delete.
  4. **Payload:** Sanity sends a JSON body with `_type` and optionally `language`; the handler calls `revalidateTag()` for the matching tags (`projects-es`, `projects-en`, `notes-es`, etc.).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
