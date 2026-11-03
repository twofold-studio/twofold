import { describe, expect, it } from "vite-plus/test";
import { chooseLocale } from "../server/locales.mjs";
import { getContent } from "../lib/i18n/content";
import { en, bg } from "../lib/i18n/dictionaries";

describe("browser language and saved preference", () => {
  it.each([
    ["bg-BG,bg;q=0.9,en;q=0.8", "", "bg"],
    ["en-US,bg;q=0.9", "", "en"],
    ["en;q=0.3,bg;q=0.9", "", "bg"],
    ["bg;q=0,en;q=0.5", "", "en"],
    ["de-DE", "", "en"],
    ["bg-BG", "lang=en", "en"],
    ["en-US", "theme=dark; lang=bg; other=yes", "bg"],
    ["bg-BG", "lang=invalid", "bg"],
  ])("%s, cookie %s -> %s", (language, cookie, expected) =>
    expect(chooseLocale(language, cookie)).toBe(expected),
  );
});
describe("translation completeness", () => {
  it("has matching UI keys", () => expect(Object.keys(bg).sort()).toEqual(Object.keys(en).sort()));
  it("preserves projects, image counts and localized captions", () => {
    const english = getContent("en").work,
      bulgarian = getContent("bg").work;
    expect(bulgarian.map((p) => p.slug)).toEqual(english.map((p) => p.slug));
    for (const [i, project] of bulgarian.entries()) {
      expect(project.images.length).toBe(english[i]!.images.length);
      expect(project.images.every((image) => /[А-Яа-я]/.test(image.caption))).toBe(true);
    }
  });
  it("includes the founder facts supplied by the user in both languages", () => {
    for (const locale of ["bg", "en"] as const) {
      const founders = getContent(locale).founders;
      expect(founders[0]!.bio).toContain("50");
      expect(founders[1]!.bio).toContain("Palms Bet");
      expect(founders[1]!.bio).toMatch(/cybersecurity|киберсигурност/);
    }
  });
});
