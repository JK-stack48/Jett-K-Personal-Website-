# Portfolio starter

Plain HTML, CSS and JS.

## Adding work (drop-in folders)

Drop files into `content/research/`, `content/models/` or `content/decks/`; the folder sets the category.
Then run `python3 build.py`, which rebuilds `content/projects.js` and the cards update.
On GitHub Pages the included workflow (`.github/workflows/publish.yml`) runs `build.py` automatically,
so uploading a file on github.com publishes it in about a minute. See `content/HOW-TO-ADD.txt` for
cover images, descriptions and model highlights.

## Files

- `index.html`: name, intro, about, skills, contact links
- `script.js`: renders the cards. Optional hand-written cards go in `manualProjects` at the top. Each item has a `category` (`research`, `models` or `decks`), title, description, tags, optional cover `image`, optional `pdf` (opens in an in-page viewer) or `embed` (e.g. a Google Slides publish-to-web link), and extra `links`
- `styles.css`: base layout. `matrix.css`: the white-and-blue code theme on top of it (colors in `:root` at the top; change `--accent` to restyle)
- `matrix.js`: the typed prompt and the falling characters in the hero (edit the `cmd` text or the `chars` list there)
- `assets/`: `resume.pdf` and the placeholder files used by the example cards

Preview locally: open `index.html` in a browser, or run `python3 -m http.server` in this folder.

Deploy free on GitHub Pages, Netlify, or Vercel by uploading this folder or pushing it to a repo.
