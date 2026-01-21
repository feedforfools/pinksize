# Pink Size - Website

Simple website for Pink Size, an Italian Pink Floyd tribute band.

## Tech

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS

## Run locally

1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notes

- Update images in `public/images/` to customize the look.
- Content lives in `src/app` and `src/components`.

## Supabase

Create a Supabase project and add these environment variables to your `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Required tables:

### `events`

- `id` (int8, primary key)
- `date` (date)
- `venue` (text)
- `location` (text)
- `link` (text, nullable)
- `created_at` (timestamp with time zone, default now())

### `videos`

- `id` (int8, primary key)
- `youtube_id` (text)
- `title` (text)
- `year` (text, nullable)
- `badge` (text, nullable) — expected values: `LIVE`, `PROMO`, `STUDIO`
- `created_at` (timestamp with time zone, default now())

## Todo
- Setup simple backend for inserting events to the DB via Telegram bot

## License

All rights reserved. Pink Size © 2026
