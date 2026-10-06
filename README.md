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
  Each note has its own simple, topic-specific etched illustration, matching
  the footer's fine hatching rather than fixed-color collage. Artwork is stored
  as transparent ink masks (`*-etch.webp`, plus `*-etch-thumb.webp`); CSS sets
  the ink and paper colors, so the same drawing works in light and dark themes.
  Keep transparent padding on all four edges; never bake in a frame or white
  baseline. OG/Twitter images (1200 × 630) combine each drawing with its title.
  `pnpm generate:article-images` regenerates them from the registry; dev/build
  run it automatically. Articles without a cover use the site share image.
  Rich interactive articles remain in MDX. Use recognizable subjects and clear
  relationships; matching style does not mean reusing the same illustration.
- `app/sitemap.ts` — sitemap, generated from `app/articles/registry.ts`.
  Adding a note needs no edit here. The site has no RSS feed.
- `app/globals.css` — stylesheet entry point; tokens, site chrome, lists, and
  article styles live in `app/styles/` (light/dark via `data-theme`). The home
  page leads from the research thesis to Explore, About, and News. News uses a
  narrower reading column, with older entries in an expandable archive. Long
  research notes have a side table of contents on wide screens and a collapsible
  one at narrower widths.
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
