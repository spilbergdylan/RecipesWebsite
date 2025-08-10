# Our Family Recipes

Cherished recipes from our family to yours. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS + DaisyUI, Prisma + SQLite. Local image uploads with an easy path to S3 later.

## Features

- Warm, cozy design with subtle paper texture
- Landing page linking to each family recipe book
- Per-family recipe grids with search and tag filters
- Full recipe detail with ingredients checklist and step-by-step instructions
- Add/Edit/Delete recipes via modal
- Local image uploads to `/uploads` with type/size validation
- Family memories section with optimistic add
- Global and per-family search (by title and ingredient), tags (`dessert`, `main`, `breakfast`)
- Zod + react-hook-form with inline errors
- DaisyUI custom warm theme + dark mode ready
- Basic unit tests and React Testing Library tests

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS + DaisyUI
- Prisma ORM + SQLite
- Zod + react-hook-form
- Vitest + Testing Library

## Setup

```bash
pnpm i
pnpm prisma migrate dev --name init
pnpm prisma db seed
pnpm dev
```

Then open `http://localhost:3000`.

## Environment

Create `.env` from `.env.example`:

```
DATABASE_URL="file:./dev.db"
```

## Build & Start

```bash
pnpm build && pnpm start
```

## Notes on uploads and S3

- Local uploads are saved to the project `uploads/` folder. They are served via the app route at `/uploads/*`.
- For deployment to serverless platforms, local storage won’t persist. Swap the implementations in `lib/storage.ts` with S3 Put/Get (example sketch included in comments) and update image URLs accordingly.

## Scripts

- `pnpm dev` – start dev server
- `pnpm build` – build
- `pnpm start` – start production server
- `pnpm test` – run unit/component tests
- `pnpm prisma migrate dev` – run dev migration
- `pnpm prisma db seed` – seed sample data

## Run/Use

- Install: `pnpm i`
- DB migrate: `pnpm prisma migrate dev --name init`
- Seed: `pnpm prisma db seed`
- Dev: `pnpm dev`
- Open `http://localhost:3000`
- Add recipes via each family page; images appear in `/uploads` 