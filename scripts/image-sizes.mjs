/**
 * Makes the smaller copies that components/responsive-image.tsx lists in srcset:
 * public/work/<project>/<name>-800.webp, -1600.webp and -2400.webp next to each
 * 3200 px screenshot. Run it after adding or replacing a screenshot:
 *
 *   node scripts/image-sizes.mjs
 *
 * Needs `cwebp` (libwebp) on PATH, e.g. `brew install webp`. The copies are
 * committed, so the Docker build doesn't need it.
 */
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const WIDTHS = [800, 1600, 2400];
const root = "public/work";

for (const project of readdirSync(root)) {
  for (const file of readdirSync(join(root, project))) {
    if (!file.endsWith(".webp") || file.startsWith("logo") || /-\d+\.webp$/.test(file)) continue;
    const source = join(root, project, file);
    for (const width of WIDTHS) {
      const target = source.replace(/\.webp$/, `-${width}.webp`);
      execFileSync("cwebp", [
        "-quiet",
        "-q",
        "80",
        "-m",
        "6",
        "-resize",
        String(width),
        "0",
        source,
        "-o",
        target,
      ]);
    }
    console.log(`${source}: ${WIDTHS.join(", ")} px`);
  }
}
