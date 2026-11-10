import { describe, expect, it } from "vite-plus/test";
import { chooseLocale } from "../server/locales.mjs";
import { getContent } from "../lib/i18n/content";
import { en, bg } from "../lib/i18n/dictionaries";
import { pageFromPath, pagePath } from "../lib/pages";

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
      expect(founders[1]!.bio).toContain("Front-end");
      expect(founders[1]!.bio).toMatch(/cybersecurity|киберсигурност/);
    }
  });
  it("keeps current employers out of the founder bios", () => {
    for (const locale of ["bg", "en"] as const) {
      for (const founder of getContent(locale).founders) {
        expect(founder.bio).not.toMatch(/CarrierX|Palms ?Bet/i);
      }
    }
  });
  it("uses the same rounded catalogue figures everywhere", () => {
    for (const locale of ["bg", "en"] as const) {
      const text = JSON.stringify(getContent(locale));
      expect(text).not.toMatch(/3[ ,]?646|около 3600|about 3,600|5[ ,]?000/);
    }
  });
});
describe("case study pages", () => {
  it("map project paths in both directions", () => {
    expect(pageFromPath("/bg/work/helios")).toEqual({ kind: "work", slug: "helios" });
    expect(pageFromPath("/en/work/vaiced/")).toEqual({ kind: "work", slug: "vaiced" });
    expect(pageFromPath("/bg")).toEqual({ kind: "home" });
    expect(pagePath("en", { kind: "work", slug: "arkada" })).toBe("/en/work/arkada");
  });
  it("give every project a page title in both languages", () => {
    for (const locale of ["bg", "en"] as const) {
      for (const project of getContent(locale).work) {
        expect(project.seoTitle.startsWith(project.name)).toBe(true);
        expect(
          project.challenge && project.solution && project.result && project.year,
        ).toBeTruthy();
      }
    }
  });
});
