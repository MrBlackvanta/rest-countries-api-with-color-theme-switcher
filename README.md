# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [GitHub](https://github.com/MrBlackvanta/rest-countries-api-with-color-theme-switcher)
- Live Site URL: [Netlify](https://vanta-rest-countries-api-with-theme.netlify.app)

## My process

### Built with

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)

### What I learned

**`priority` on `<Image>` is not the same as `fetchPriority="high"` + `loading="eager"`.** I started by setting both props manually on the hero, thinking that covered it. It didn't. The whole point of `priority` is that Next injects a `<link rel="preload" as="image">` into the document head, so the browser starts the LCP request before it finishes parsing the body. Manually setting `fetchPriority` and `loading` skips that preload — which is the actual win. Use `priority` for exactly one image (the LCP candidate), never below the fold.

**Static-imported images already carry `width` and `height`.** I had typed natural dimensions into my data layer alongside each `import`, then passed them as props to `<Image>`. Both are duplicates: `import heroImage from "...png"` returns a `StaticImageData` object that already has `width`, `height`, `src`, and `blurDataURL` baked in at build time. When `src` is a static import, `<Image>` infers the dimensions for you — pass nothing but `src`, `alt`, `sizes`, and (for the LCP) `priority`. Two sources of truth turn into one.

**Tailwind silently drops typo'd variants.** I had `mx:px-0` and `mb:mb-2` in two files, where I meant `md:`. Both classes did nothing — Tailwind doesn't error on unknown variant prefixes, it just emits no rule. The class string looked correct in the source but never matched at runtime. When a responsive tweak doesn't apply, check the compiled CSS, not the JSX.

**`<blockquote>` wraps the quote, attribution goes inside.** First pass I had the quote text in a `<p>`, sibling to a `<blockquote>` that contained the avatar and the author. That's backwards. The HTML spec says `<blockquote>` _is_ the quote — the quoted content lives inside it. Attribution belongs inside, in a `<footer>`. And `<cite>` is for the title of a work ("The Two Towers"), not a person's name — for the author, a `<span>` is the safer choice.

**An `<a>` without `href` is not a link.** Wrapped every footer info row in `<a href={item.href}>`. The address row has no `href` in the data, so it rendered as `<a>` with a missing `href` attribute — invalid HTML, not focusable, not announced as a link. Fix is conditional rendering: only emit the `<a>` when `href` exists; otherwise render the row as a plain wrapper. Optional fields in the data need optional structure in the JSX.

**`aria-label` belongs on the focusable element, not on the icon inside it.** I added `ariaLabel: "Facebook"` to the social link data and passed it to the `<item.icon>` SVG. Screen readers still announced the link as just "link" — accessible name is computed from the link's content, not from a buried attribute. The label has to live on the `<a>` itself, and the SVG inside should be `aria-hidden="true"` so it isn't read on top.

**`useId()` inside an SVG turns it into a client island.** Several icons in this challenge use internal `id="a"` for filters and clip-paths — render the same icon twice on a page and the IDs collide. The build-time script in `scripts/` rewrites those IDs through `useId()` so each render gets a unique prefix, but `useId` is a hook, so every patched file becomes `"use client"`. The alternative is a static per-file prefix (e.g. `bg-curvy-a`) that stays an RSC at the cost of "no two copies of this SVG on a page, ever." For this design I picked safety; for a stricter perf budget, the static-prefix path is the better trade.

## Author

- UpWork - [Abdelrhman Abdelaal](https://upwork.com/freelancers/~01f0a9479696b61f49)
- Frontend Mentor - [@MrBlackvanta](https://www.frontendmentor.io/profile/MrBlackvanta)
- LinkedIn - [Abdelrhman Abdelaal](https://www.linkedin.com/in/abdelrhman-vanta/)
