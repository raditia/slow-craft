# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"The Bored Coder" — a custom Ghost CMS theme (v5+) forked from the Headline starter theme. Handlebars (HBS) templates, PostCSS, no framework.

## Commands

```bash
npm install          # install deps
npx gulp             # dev: build + watch + livereload
npx gulp build       # one-shot build (CSS + JS + locales) — run before committing
npm run test         # gscan theme validation
npm run zip          # build + package dist/the-bored-coder.zip for Ghost upload
```

**Critical**: Ghost serves `assets/built/screen.css` (compiled), NOT `assets/css/screen.css` (source). Always run `npx gulp build` and commit both `assets/built/screen.css` and `assets/built/screen.css.map` after any CSS change.

## CSS architecture

Single source file: `assets/css/screen.css`. It imports `@tryghost/shared-theme-assets` first (Ghost base styles), then all custom styles follow.

All custom classes are prefixed `bc-` (Bored Coder). Design tokens are CSS custom properties on `:root`:

| Token | Value |
|---|---|
| `--bc-bg` | `#F7F5F0` (cream background) |
| `--bc-text` | `#1A1815` (near-black) |
| `--bc-accent` | `#B0532B` (rust orange) |
| `--bc-font-head` | Space Grotesk |
| `--bc-font-body` | Hanken Grotesk |

## Template structure

| File | Purpose |
|---|---|
| `default.hbs` | Shell: `<head>`, header, footer, nav, `{{{body}}}` slot |
| `home.hbs` | Homepage — featured/newest hero + recent grid + newsletter + archive |
| `post.hbs` | Article view |
| `page-about.hbs` | Custom About page (`/about`) |
| `page-writing.hbs` | Full writing index |
| `page-photos.hbs` | Photo gallery |
| `page-til.hbs` | Today I Learned listing |
| `index.hbs` | Tag/author fallback listing |
| `partials/loop-grid.hbs` | Card partial used in all 3-up grids |

## Homepage logic (`home.hbs`)

Featured post detection uses nested `{{#if posts}}` inside a `#get` block — **not** the `{{else}}` clause of `#get`. Ghost's `{{else}}` on async `#get` fires on query errors, not empty results, so the `{{else}}` clause cannot be relied on for the "no results" case.

```
{{#get "posts" filter="tag:-til+featured:true" limit="1" ...}}
  {{#if posts}}
    → featured card (.bc-featured.bc-featured--card) + Recent grid (limit=3, no skip)
  {{else}}
    → newest post as hero (.bc-featured, open layout) + Recent grid (limit=4, from="2")
  {{/if}}
{{/get}}
```

**Hero card variants:**

| Condition | Class |
|---|---|
| Featured post + has image | `bc-featured bc-featured--card` (white card, shadow, border-radius 16px) |
| Featured post + no image | `bc-featured-typo` (dark `#1A1815` card with left accent bar) |
| Newest post + has image | `bc-featured` (open layout, transparent, border-bottom, gap between columns) |
| Newest post + no image | `bc-featured-typo` (same dark card, no "Featured" label in kicker) |

## Grid cards (`partials/loop-grid.hbs`)

Posts with `feature_image` render as image cards. Posts without fall back to typographic cards (`.bc-card-typo`) with category-tinted backgrounds keyed off `primary_tag.slug`:

```
bc-card-typo--work   → #EDE7DB
bc-card-typo--growth → #DFE9E1
bc-card-typo--life   → #E9DFE9
```

## Ghost HBS gotchas

- Use `{{#get "posts" filter="..."}}` with `{{#if posts}}` to branch on empty results — never rely on `{{else}}` for empty-result branching.
- `{{#foreach posts from="2"}}` skips the first post (used to exclude the hero from the Recent grid in the no-featured branch).
- Filter `tag:-til` excludes TIL posts from main feeds.
- `@custom.*` values come from the `config.custom` object in `package.json`.

## Custom settings (`package.json` → `config.custom`)

All configurable via Ghost Admin → Design → Customize:

| Key | Group | Purpose |
|---|---|---|
| `hero_headlines` | homepage | Pipe-separated strings, one picked at random on load |
| `hero_subtitles` | homepage | Same |
| `writing_page_url` | homepage | URL for "All writing →" links |
| `footer_tagline` | footer | Tagline in footer copyright line |
| `about_*` | about | Content for the About page (location, day job, email, GitHub URL, etc.) |

## Versioning

`package.json` version must be bumped on every commit:
- Major: visual revamp or breaking redesign
- Minor: new feature or layout change
- Patch: bugfix or copy tweak
