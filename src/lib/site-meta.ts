export const SITE_NAME = "JomNgaji";
export const SITE_TAGLINE = "Al-Quran Digital Untuk Semua";
export const SITE_URL = import.meta.env.VITE_SITE_URL ?? "https://jomngaji.com";
export const OG_IMAGE_PATH = "/og-image.jpg";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

type PageMetaOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function pageMeta({ title, description, path = "/", image = OG_IMAGE_URL }: PageMetaOptions) {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE_NAME} – ${SITE_TAGLINE}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
