import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { seo } from "./src/content.ts";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/**
 * Writes the <title>, description, Open Graph and Twitter tags into index.html (at <!-- seo -->).
 * og:url / og:image / twitter:image / canonical must be ABSOLUTE, so they are built from
 * VITE_SITE_URL. Without it (e.g. a Lovable preview build) those tags are left out rather than
 * shipped with a relative or localhost URL.
 */
function seoTags(): Plugin {
  let siteUrl = "";
  let base = "/";
  return {
    name: "nayan-seo",
    configResolved(config) {
      base = config.base;
      // loadEnv reads .env files AND the real environment (e.g. the Docker build ARG), env wins
      const envDir = typeof config.envDir === "string" ? config.envDir : config.root;
      const env = loadEnv(config.mode, envDir, "VITE_");
      siteUrl = (env.VITE_SITE_URL ?? "").trim().replace(/\/+$/, "");
      if (siteUrl && !/^https?:\/\/[^/]+/.test(siteUrl)) {
        throw new Error(`VITE_SITE_URL must be an absolute URL like https://nayan.sa (got "${siteUrl}")`);
      }
      if (config.command === "build") {
        if (/localhost|127\.0\.0\.1/.test(siteUrl)) {
          throw new Error(`VITE_SITE_URL points at localhost ("${siteUrl}") — set the public domain.`);
        }
        if (!siteUrl) {
          config.logger.warn(
            "\n[nayan-seo] VITE_SITE_URL is not set — og:url, og:image, twitter:image and canonical are omitted.\n",
          );
        }
      }
    },
    transformIndexHtml(html) {
      const abs = (path: string) => `${siteUrl}${base}${path.replace(/^\//, "")}`;
      const lines = [
        `<title>${esc(seo.title)}</title>`,
        `<meta name="description" content="${esc(seo.description)}" />`,
        `<meta name="theme-color" content="${seo.themeColor}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="${esc(seo.siteName)}" />`,
        `<meta property="og:locale" content="${seo.locale}" />`,
        `<meta property="og:title" content="${esc(seo.title)}" />`,
        `<meta property="og:description" content="${esc(seo.description)}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${esc(seo.title)}" />`,
        `<meta name="twitter:description" content="${esc(seo.description)}" />`,
      ];
      if (siteUrl) {
        lines.push(
          `<link rel="canonical" href="${abs("")}" />`,
          `<meta property="og:url" content="${abs("")}" />`,
          `<meta property="og:image" content="${abs("og-image.jpg")}" />`,
          `<meta property="og:image:type" content="image/jpeg" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta property="og:image:alt" content="${esc(seo.imageAlt)}" />`,
          `<meta name="twitter:image" content="${abs("og-image.jpg")}" />`,
          `<meta name="twitter:image:alt" content="${esc(seo.imageAlt)}" />`,
        );
      }
      return html.replace("<!-- seo -->", lines.join("\n    "));
    },
  };
}

export default defineConfig({
  plugins: [react(), seoTags()],
  server: { port: 8080 },
});
