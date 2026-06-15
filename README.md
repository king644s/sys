# SYSLight — Next.js

Next.js port of the SYSLight architectural lighting site (migrated from the Vite app in the parent folder).

## Run

```bash
cd nextjs
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) (Vite dev server uses port 3000 in the parent project).

## Build

```bash
npm run build
npm start
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/products` | Products hub |
| `/products/[category]` | Category listing |
| `/products/[category]/[product]` | Product detail |
| `/smart-lights` | Smart CCT demo |
| `/projects` | Projects gallery |
| `/contact` | Contact |

## Structure

- `app/` — Next.js App Router pages
- `views/` — Page components (ported from Vite `src/pages`)
- `components/` — UI, layout, 3D components
- `data/` — Product catalog data
- `public/assets/` — Product images and logo
