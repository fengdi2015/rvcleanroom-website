# RV-Cleanroom React site

This is the modern framework edition of the RV-Cleanroom website. It uses React 19, TypeScript, Vinext, and Vite while preserving the current WordPress site's content and visual design.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Vercel deployment

The repository includes a Vercel Build Output API configuration using vinext's
Nitro adapter. Import the repository in Vercel with the project root at the
repository root. `vercel.json` runs `vite build`; Nitro detects Vercel and emits
the server function and static assets under `.vercel/output`.

To verify the Vercel target locally:

```powershell
$env:NITRO_PRESET='vercel'
npx vite build
```

The 60 imported pages are registered as framework routes. React handles internal navigation, the responsive menu, form behavior, metadata, background images, and missing routes. Current WordPress styles and media URLs are retained for visual parity, with archived content available as a fallback when a live route is unavailable.

The imported page data can be synchronized from `rvcleans.com`, with the sibling `rvcleans-conversion/html` directory as its fallback, by running `npm run import:wordpress`. The About Us route intentionally uses the recovered archive because the current WordPress route serves broken markup.
