import type { MetadataRoute } from "next";

const base = "https://sylvasounds.com";

const routes = ["", "/about", "/contact", "/industries", "/portfolio"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
