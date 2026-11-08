# Hrishikesh Belagali — academic website

A single-page academic website built with Vue 3, TypeScript, and Vite.

## Local development

Install Node.js 22.12 or newer, then run these commands from this folder:

```bash
npm ci
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173). Keep the terminal running; saved changes update automatically in the browser. Stop the server with Ctrl+C.

If npm reports that WSL 1 is unsupported, use WSL 2 with Node installed inside Linux, or run the project from a Windows terminal with Node installed there.

To view from another device on your local network, run `npm run dev -- --host 0.0.0.0` and open the network address printed by Vite.

## Content and assets

- `src/App.vue`: biography, education, research, publications, software, and contact links.
- `src/assets/main.css` and `src/assets/base.css`: layout, typography, and monochrome theme.
- `src/assets/movie.mp4`: the molecular dynamics video, imported by Vite so it works in production.
- `src/assets/profile.jpg`: profile photo.
- `src/assets/gatesetrotation.png`: Bloch sphere figure.
- `public/favicon.svg` and `public/favicon.ico`: monochrome orbital tab icon.
- `src/components/CvViewer.vue`: embedded CV viewer. Each opening fetches `HrishikeshBelagali_cv.pdf` from the `main` branch of `hkbelagali/cv` on GitHub. Commit the updated **PDF**, not just the LaTeX source, to that repo to update the viewer. No website rebuild is needed. Browsers without embedded PDF support can use “Open in new tab.”

## Last updated date

When Vite starts or builds the site, `vite.config.ts` reads the latest checked-out Git commit's committer date using `git log -1 --format=%cI`. That date is displayed at the top left of the header. GitHub Actions checks out the triggering commit, so every deployed build shows the date of its source commit without a GitHub API request.

Uncommitted edits don't change this date. Restart the development server after making or pulling a commit to refresh it. If Git history is unavailable, the header says the date is unavailable rather than displaying the build date.

## Validation and deployment

```bash
npm run test:unit -- --run
npm run build
```

The build checks TypeScript and writes the production website to `dist/`. Run `npm run preview` to preview that build locally.

The existing GitHub Actions workflow deploys pushes to `main` to GitHub Pages. The production asset base is `/portfolio/`, configured in `vite.config.ts`.
