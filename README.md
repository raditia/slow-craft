# The Bored Coder

A custom Ghost theme for [The Bored Coder](https://ghost.org) blog. Forked from the Headline starter theme and redesigned from scratch.

---

## Using the theme

### Installation

1. Run `npm run zip` to build and package the theme
2. In Ghost Admin → Settings → Design → Change theme → Upload ZIP

### Featured post

Mark any post as **Featured** in Ghost (post settings → Featured). The homepage will display it as a highlighted card above the Recent section. Only one featured post is shown; if multiple posts are featured, Ghost picks the most recent one.

- Featured post **with image** — white card with shadow, "Category · Featured" kicker, "Read article →" link
- Featured post **without image** — dark typographic card (`#1A1815`) with a left accent bar and a faded background word

If no post is featured, the homepage falls back to the newest post as the hero (open layout, no white card).

### Category tags and typographic cards

The theme recognises three category tag slugs that affect card styling when a post has no feature image:

| Tag slug | Typographic card background |
|---|---|
| `work` | `#EDE7DB` (warm sand) |
| `growth` | `#DFE9E1` (sage green) |
| `life` | `#E9DFE9` (soft lavender) |

Posts without an image and without one of these slugs fall back to the default muted background.

### TIL (Today I Learned) posts

Tag posts with `til` to keep them out of the main homepage and writing feeds. They appear only on the `/til` page (backed by `page-til.hbs`). The filter `tag:-til` is applied to every homepage and writing-page query.

### Custom settings (Ghost Admin → Design → Customize)

| Setting | What it does |
|---|---|
| **Hero headlines** | Pipe-separated list. One is picked at random on each page load for the homepage headline. |
| **Hero subtitles** | Same — pipe-separated, random pick per load. |
| **Writing page URL** | URL used for "All writing →" links (default: `/writing`). |
| **Footer tagline** | Short line after the copyright notice in the footer. |
| **About — Location** | Displayed in the facts grid on the About page. |
| **About — Day job** | Your current role, shown on the About page. |
| **About — Writing since** | Year displayed in the About facts grid. |
| **About — Currently into** | Pipe-separated list of current interests, rendered as individual items. |
| **About — Email** | If set, shows an "Email me" button on the About page. |
| **About — GitHub URL** | If set, shows a GitHub icon link on the About page. |
| **About — The name explanation** | Short paragraph explaining the blog name, shown on the About page. |

### Special pages

These pages require a Ghost **Page** with the matching slug and the template selected under Page settings → Template:

| Slug | Template | Purpose |
|---|---|---|
| `/about` | About | Author bio, facts grid, social links, currently-into list |
| `/writing` | Writing | Full post index with tag filters |
| `/photos` | Photos | Photo gallery using PhotoSwipe lightbox |
| `/now` | Now page | Currently-reading book entry component |
| `/til` | TIL | Today I Learned feed (only shows posts tagged `til`) |
| `/newsletter` | Newsletter | Subscribe landing page |

---

## Development

```bash
npm install          # install dependencies
npx gulp             # build + watch + livereload
npx gulp build       # one-shot build (run before committing any CSS change)
npm run test         # Ghost theme validation (gscan)
npm run zip          # build + package dist/the-bored-coder.zip
```

Edit `/assets/css/screen.css` — it compiles to `/assets/built/screen.css`. Always commit both the source and built files.

---

## Versioning

Bump `version` in `package.json` on every commit:

- **Major** — visual revamp or breaking redesign
- **Minor** — new feature or layout change
- **Patch** — bugfix or copy tweak

Update this README when making any change that affects how the theme is used (new settings, new tag conventions, new special pages).

---

## License

MIT — Copyright (c) 2013-2026 Ghost Foundation
