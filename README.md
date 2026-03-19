# W4Whiskers Portfolio

This is the personal portfolio site for **W4Whiskers**. It showcases creative web work, Minecraft-related projects, UI experiments, and creator links in a custom interactive layout built with Next.js.

## What This Project Includes

- A custom landing page with profile, socials, and live YouTube channel stats
- A projects page for showing portfolio work
- A presentation page for a more visual showcase
- Animated UI elements, glass-style panels, and particle effects
- Responsive layout for desktop and mobile

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- tsParticles

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

- `app/` - routes and page-level files
- `components/` - reusable UI components
- `public/` - images and static assets

## Notes

The homepage pulls YouTube channel data for `@W4Whiskers1` and falls back safely if the live stats source is unavailable.
