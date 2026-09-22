# Namegen

A name generator with a liquid-glass, Tinder-style swipe UI. Swipe (or click) through algorithmically generated names, save the ones you like, tune how they sound.

Built because coming up with names is hard — the same idea behind how [Surdic](https://surdic.de) got its name: don't pick letters at random, generate them from grammar-like rules so the result is actually pronounceable.

## Two ways to review names

- **Swipe** — one name at a time, card-stack style. Swipe/click/arrow-keys to skip or save; the next card is ready instantly (candidates are pre-generated in a small buffer, and a swipe advances the queue immediately rather than waiting on the exit animation to finish).
- **Turbo** — a dense grid of names (24 at a time, "Load more" to keep going) for scanning a lot of candidates at once instead of one-by-one. Click a tile to save/unsave it; "New batch" rerolls the whole grid.

Both views share the same generator settings and read/write the same saved list.

## How it generates names

Seven generator modes, all running client-side, no backend:

- **Phonetic** — builds words syllable-by-syllable from a phonetic style (a curated set of onsets, vowels, codas, and syllable shapes). Eight styles are included (Universal, Minimal, Nordic, Kana-inspired, Germanic, Romance, Slavic, Fantasy), each with its own consonant clusters and preferred endings.
- **Skeleton** — the literal "Surdic" method: pick a random skeleton of consonants (e.g. `s-r-d-c`) and fill vowels into the gaps between them (`surdic`). The most basic of the bunch, and the one the whole project was named after.
- **Markov** — trains a character-level Markov chain on a pool of real words (from the built-in word categories, or from words related to a theme you type in) and generates new words that follow the same letter patterns.
- **Blend** — picks two real words and blends them into a portmanteau (splitting each near a vowel boundary and splicing them together), the way brand names like "Instagram" or "Verizon" get made.
- **Affix** — takes a real word and bolts on a brandable prefix/suffix (`get-`, `-ify`, `-hub`, `-wise`, …), the Spotify/Shopify school of naming.
- **Real Word** — just a real word, unmodified, from the categories/theme pool. Sometimes the best name is one that already exists.
- **Clipped** — takes a real word and drops its trailing vowel(s), the Flickr/Tumblr/Scribd trick.

Every candidate is scored by a readability heuristic (consonant-cluster length, vowel ratio, repeated letters, etc.) before it's shown to you. The **Readability** slider sets how strict that filter is — low lets through wilder combinations, high only shows the easiest ones to pronounce.

Optionally, type a **theme word** (e.g. "ocean", "speed") and the app fetches semantically related words from the free [Datamuse API](https://www.datamuse.com/api/) (no key required) to seed the word-pool modes (Markov, Blend, Affix, Real Word, Clipped), so results lean thematically toward what you typed. If the request fails or you're offline, it silently falls back to the built-in word categories.

## Using it

- Switch between **Swipe** and **Turbo** in the header.
- Saved names go to a list kept in `localStorage` — nothing leaves your browser except the optional Datamuse lookup.
- Open **Options** to change mode, phonetic style, word categories, theme word, syllable/consonant count, readability, a required starting letter, and text case.
- Open the saved list (heart icon) to copy, export as `.txt`, or remove names.

## Look and feel

Dark, glassy UI in the spirit of Apple's Liquid Glass: translucent blurred panels (`backdrop-filter`) with a soft inner rim-light, sitting over slowly-drifting colored blobs (`AmbientBackground`) so the glass has something to actually refract. See `.glass`/`.glass-pill` in [`src/index.css`](src/index.css).

## Development

```bash
npm install
npm run dev
```

```bash
npm run build   # type-checks and builds to dist/
npm run preview # serve the production build locally
```

## Stack

React + TypeScript + Vite, Tailwind CSS, [Framer Motion](https://motion.dev) for the swipe physics, [Lucide](https://lucide.dev) icons. No backend, no API keys, no tracking.

## Deployment

This repo stays private. Live previews are published via [github-deployment-infrastructure](https://github.com/filstawski/github-deployment-infrastructure) (`gdi`) to a disposable repo under the `surdic-deployments` org — see [`.github/deployment.yml`](.github/deployment.yml) for config. Previews expire after their TTL (14-day max); run `gdi update <deployment-id>` to keep one alive, or `gdi urls` to list active ones.

If you'd rather host this permanently instead: make the repo public, add back a standard `actions/deploy-pages` workflow, and GitHub Pages will serve straight from `main`. The Vite `base` in [`vite.config.ts`](vite.config.ts) is already set to `/namegen/` to match the repo name for that scenario.
