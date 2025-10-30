# Tao An's Space

A minimal static personal homepage.

Quick preview
- Open in the host browser:
  - $BROWSER index.html
- Or run a simple HTTP server from the repository root:
  - python3 -m http.server 8000
  - $BROWSER http://localhost:8000

Main files
- [index.html](index.html) — site entry
- [styles.css](styles.css) — styling (includes classes [`.content`](styles.css) and [`.card`](styles.css))
- [.claude/settings.local.json](.claude/settings.local.json) — local settings
- [.gitignore](.gitignore)

Notes
- The site is a static HTML/CSS single page. Edit `index.html` to change links or content.
- Use the `$BROWSER` environment helper to open pages in the host browser from the dev container.

Contributing
- Edit and push changes:
  - git add .
  - git commit -m "Update"
  - git push

Author
- Tao An

License
- All rights reserved (add a license file if you want to open source).