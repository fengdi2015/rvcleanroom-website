# RV-Cleanroom React site

This is the modern framework edition of the RV-Cleanroom WordPress backup. It uses React 19, TypeScript, Vinext, and Vite.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The 60 recovered pages are registered as framework routes. React handles internal navigation, the responsive menu, form behavior, metadata, and missing routes. Original WordPress media and visual styles are stored under `public/`.

The imported page data can be regenerated from the sibling `rvcleans-conversion/html` directory with `npm run import:wordpress`.
