import { describe, expect, it } from "vite-plus/test";
import { chooseLocale } from "../server/locales.mjs";
import { getContent } from "../lib/i18n/content";
import { en, bg } from "../lib/i18n/dictionaries";
import { pageFromPath, pagePath } from "../lib/pages";
import {
  clientAddress,
  formatEnquiry,
  handleEnquiry,
  validateEnquiry,
} from "../server/enquiry.mjs";

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
  it("uses the founder spelling explicitly corrected in commit 2d6a749", () => {
    expect(getContent("bg").founders[0]!.name).toBe("Вилиан Герджиков");
    expect(JSON.stringify([bg, getContent("bg")])).not.toContain("Вилиян");
  });
  it("keeps one spelling and one form of address in each language", () => {
    const english = JSON.stringify([en, getContent("en")]);
    expect(english).not.toMatch(/\bcatalog\b|\bcolor\b/);
    const bulgarian = JSON.stringify([bg, getContent("bg")]);
    // The polite plural is lower case for a public text: "ви", "вашия", not "Ви", "Вашия".
    expect(bulgarian).not.toMatch(/[а-я,] (Вие|Ви|Вас|Ваш[а-я]*)[\s,.!?]/);
    // One spelling of "player".
    expect(bulgarian).not.toMatch(/плеър/i);
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
    expect(pageFromPath("/bg/work/")).toEqual({ kind: "work-index" });
    expect(pageFromPath("/en/work")).toEqual({ kind: "work-index" });
    expect(pagePath("bg", { kind: "work-index" })).toBe("/bg/work");
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
describe("contact form enquiries", () => {
  const valid = { name: "Иван", email: "ivan@example.com", message: "Нов сайт", locale: "bg" };
  it("accept a complete enquiry and trim it", () => {
    expect(validateEnquiry({ ...valid, name: "  Иван " })).toMatchObject({
      name: "Иван",
      locale: "bg",
    });
  });
  it.each([
    [{ ...valid, email: "not-an-email" }],
    [{ ...valid, name: "" }],
    [{ ...valid, message: "x".repeat(5001) }],
    [null],
  ])("reject %j", (input) => expect(validateEnquiry(input)).toBeNull());
  it("flag the hidden trap field as spam", () => {
    expect(validateEnquiry({ ...valid, website: "https://spam.example" })).toEqual({ spam: true });
  });
  it("include the company only when given", () => {
    expect(formatEnquiry({ ...valid, company: "" })).not.toContain("Company");
    expect(formatEnquiry({ ...valid, company: "Хелиос" })).toContain("Company: Хелиос");
  });
  it("answer 503 when no delivery webhook is configured", async () => {
    let status = 0;
    const res = { writeHead: (code: number) => (status = code), end: () => {} };
    await handleEnquiry({ method: "POST", headers: {}, socket: {} } as never, res as never, "");
    expect(status).toBe(503);
  });
  it.each([
    ["203.0.113.7", undefined, "203.0.113.7"],
    ["1.2.3.4, 203.0.113.7", undefined, "203.0.113.7"],
    [undefined, "198.51.100.2", "198.51.100.2"],
    [undefined, undefined, "unknown"],
  ])("rate-limit by the proxy-added address (%s, socket %s)", (forwarded, socket, expected) => {
    const req = { headers: { "x-forwarded-for": forwarded }, socket: { remoteAddress: socket } };
    expect(clientAddress(req as never)).toBe(expected);
  });
});
