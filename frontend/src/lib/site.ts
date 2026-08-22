export const siteUrl =
  process.env.SITE_URL ??
  "https://rest-countries-api-with-color-theme-switcher.abdelrhman-ahmed8881.workers.dev";

export const siteName = "Where in the world?";

// A route that declares its own `openGraph` replaces the parent's rather than merging
// into it, so anything every page needs has to be spread in from here.
export const openGraphBase = {
  siteName,
  type: "website" as const,
  locale: "en_US",
  images: [
    {
      url: "/opengraph-image.jpg",
      width: 1200,
      height: 630,
      alt: "Where in the world? Country cards showing each flag, population, region and capital.",
    },
  ],
};
