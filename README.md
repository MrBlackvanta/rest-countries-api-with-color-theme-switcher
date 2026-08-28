# REST Countries API with theme switcher

My solution to the [REST Countries API with color theme switcher](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca)
challenge on Frontend Mentor.

Instead of calling restcountries.com I wrote my own .NET API behind it, which serves
paginated and filterable country data. It runs in a container on Render; the frontend is a
Cloudflare Worker via OpenNext.

![](./screenshot.webp)

- Live: https://rest-countries-api-with-color-theme-switcher.abdelrhman-ahmed8881.workers.dev
- Code: https://github.com/MrBlackvanta/rest-countries-api-with-color-theme-switcher

## Built with

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS v4
- next-themes
- A .NET API for the data (see `backend/`)

## Notes

**`priority` goes on one image, and on a single-column mobile grid that's the first card.**
I had it on the first four, assuming "above the fold on desktop" was the rule. It isn't:
`priority` injects a high-priority preload into the head, so on mobile, where the grid is
one column, cards 1 to 3 fire three more high-priority requests competing with the actual
LCP image on a throttled connection. It ends up delaying the thing the metric measures.

**`useSearchParams()` forces a Suspense boundary, and nothing here needed to read the URL
twice.** The filter bar was pulling `name` and `region` out of the URL with the hook, which
drags a request-time dependency into the client and bails the whole route out of static
rendering unless it's wrapped. But the page is a Server Component that already awaits
`searchParams` to fetch the data, so the values are right there. Passing them down as props
deletes the hook, the boundary and the second source of truth at once.

**A filter change is a fetch, and React deliberately won't tell you it's happening.**
Picking a region calls `router.replace`, which re-runs the Server Component. Next does that
inside a transition, and a transition's whole job is to keep the old UI on screen instead of
flashing a fallback, so `loading.tsx` never appears and the page just sits there for a beat.
You have to ask for the pending state: driving the navigation with `startTransition` gives
you `isPending`, which dims the grid behind `aria-busy` and spins the dropdown.
`useOptimistic` covers the other half, so the label reads "Europe" on click rather than one
round trip later.

**The client router cache keeps dynamic pages for zero seconds by default.** Both routes are
dynamic, and since v15 the `dynamic` entry defaults to 0, so re-picking a region pays the
whole round trip again. `experimental.staleTimes: { dynamic: 300 }` gives those entries five
minutes, and since the cache key includes the search string, `/?region=Europe` and
`/?region=Africa` are separate entries. This is the part people install TanStack Query for.
`dynamicOnHover` then covers the first click.

**A changing `key` is the cleanest way to reset accumulated state.** The grid accumulates
pages as you scroll, and a filter change has to reset it to page one. Rather than an effect
watching props and resetting several state values, the page passes
``key={`${name}|${region}`}``. React unmounts and remounts, and the new initial state simply
is the new first page. The remount is the reset.

**A Server Action can be a typed data endpoint, not just a form handler.** Infinite scroll
needs page N+1. Instead of standing up a route handler and re-typing the response on the
client, `loadMoreCountries` is a `"use server"` function wrapping the same `getCountries`
the server components use. The client imports it and awaits it like a local async function.

**The region dropdown uses `aria-activedescendant`, not roving tabindex.** A native
`<select>` couldn't be styled to the design, so it's a button plus a `role="listbox"`. The
instinct is to move `tabIndex` between options; the APG's listbox pattern is simpler. Real
focus stays on the `<ul>` and a virtual cursor moves by pointing `aria-activedescendant` at
the active option's id. All the keyboard handling lives in one `onKeyDown`.

**The theme toggle's animation is an enhancement, not a dependency.** Flipping the class on
`<html>` works everywhere. The circular wipe from the click point is layered on with the
View Transitions API, feature-detected, and disabled under `prefers-reduced-motion`.

## Author

- [LinkedIn](https://www.linkedin.com/in/abdelrhman-vanta/)
- [UpWork](https://www.upwork.com/freelancers/mrblackvanta)
- [Frontend Mentor](https://www.frontendmentor.io/profile/MrBlackvanta)
