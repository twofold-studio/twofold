import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import { prerender } from "./scripts/prerender.mjs";
import { chooseLocale } from "./server/locales.mjs";

let thisIsSSR = false;
export default defineConfig({
  appType: "custom",
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "twofold-prerender",
      apply: "build",
      configResolved(config) {
        thisIsSSR = Boolean(config.build.ssr);
      },
      async closeBundle() {
        if (!thisIsSSR) await prerender();
      },
    },
    {
      name: "twofold-localized-pages",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const url = new URL(req.url ?? "/", "http://localhost");
          if (url.pathname === "/") {
            res.writeHead(307, {
              Location: `/${chooseLocale(req.headers["accept-language"], req.headers.cookie)}${url.search}`,
              Vary: "Accept-Language, Cookie",
              "Cache-Control": "private, no-store",
            });
            res.end();
            return;
          }
          if (!/^\/(en|bg)\/?$/.test(url.pathname)) {
            next();
            return;
          }
          try {
            const locale = url.pathname.split("/")[1];
            const template = await server.transformIndexHtml(
              req.url!,
              await readFile("index.html", "utf8"),
            );
            const { render } = await server.ssrLoadModule("/src/entry-server.tsx");
            const { head, html } = render(locale);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(
              template
                .replace('<html lang="en">', `<html lang="${locale}">`)
                .replace("<!--head-->", head)
                .replace("<!--app-->", html),
            );
          } catch (error) {
            next(error as Error);
          }
        });
      },
    },
  ],
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  build: { target: "es2022" },
  test: { include: ["tests/**/*.test.ts"] },
  lint: {
    options: { typeCheck: true, typeAware: true },
    plugins: ["oxc", "typescript", "react", "jsx-a11y", "import"],
    categories: { correctness: "error" },
    env: { browser: true, node: true },
    ignorePatterns: ["dist/**", ".server/**", ".next/**", "node_modules/**"],
    rules: {
      "no-unused-vars": "error",
      "typescript/no-explicit-any": "error",
      "react/rules-of-hooks": "error",
      "react/exhaustive-deps": "warn",
      "react/jsx-key": "error",
      "react/jsx-no-target-blank": "error",
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": "off",
    },
  },
  fmt: {
    printWidth: 100,
    semi: true,
    singleQuote: false,
    sortPackageJson: false,
    ignorePatterns: ["node_modules/**", "dist/**", ".server/**", ".next/**", "package-lock.json"],
  },
});
