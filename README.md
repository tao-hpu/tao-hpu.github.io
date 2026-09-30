# Tao An's Space

Personal site of [Tao An](https://tao-hpu.github.io): research, projects, open
source, and web-native research notes with interactive figures.

Built with Next.js (App Router, static export) and deployed to GitHub Pages via
GitHub Actions.

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static export to out/
pnpm serve      # serve out/ locally
```

## Structure

- `app/` — pages: home, `/research`, `/building`, `/opensource`, `/articles`
- `app/articles/` — research notes. Each note is a `page.mdx` under its slug,
  registered in `app/articles/registry.ts` (which also generates citation
  metadata and BibTeX). Interactive figures are React components in
  `components/`.
- `app/sitemap.ts` — sitemap, generated from `app/articles/registry.ts`.
  Adding a note needs no edit here. The site has no RSS feed.
- `app/globals.css` — stylesheet entry point; tokens, site chrome, lists, and
  article styles live in `app/styles/` (light/dark via `data-theme`). Home About,
  News, and Explore share the centered content column. News shows recent
  updates first, with earlier entries in a native expandable archive.
- `public/` — favicons, images

Legacy URLs from the previous static site (`/research.html` etc.) keep working:
the export writes `research.html` style files that GitHub Pages serves at both
`/research` and `/research.html`.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the
static export and publishes it to GitHub Pages. The repository's Pages setting
must be set to "GitHub Actions" as the source.

## License

Content is licensed under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/):
attribution required, non-commercial, share-alike. Code is provided as-is;
feel free to learn from it.
