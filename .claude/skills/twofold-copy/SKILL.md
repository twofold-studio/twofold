---
name: twofold-copy
description: >-
  House rules for writing and editing the Twofold website's text in English and Bulgarian:
  case studies, hero, services, team, process, FAQ, contact and founder bios. Use whenever
  a task changes or reviews copy in lib/content.ts, lib/i18n/content.ts or
  lib/i18n/dictionaries.ts, including requests like "rewrite the Helios page", "does this
  sound natural", "fix the Bulgarian", or "use unslop on this section".
---

# Twofold site copy

This guide records what the founders want the site to sound like, based on a full
rewrite of the Bukinistika case study and the home page sections in November 2026.
Follow it together with the `unslop` skill, which you should load before rewriting
anything.

## Who reads the site

Mostly Bulgarian small and medium business owners who are not technical: a pharmacy, a
bookshop, a property developer. They want to know four things. Have you solved a problem
like mine? What will it cost and how long will it take? Will you disappear after
launch? Can I update it myself? Write for that person. A developer reading the page is a
secondary audience.

## Where the text lives

| File | What it holds |
| --- | --- |
| `lib/content.ts` | English: studio info, the six projects, founders, FAQ |
| `lib/i18n/content.ts` | Bulgarian versions of the same |
| `lib/i18n/dictionaries.ts` | Interface text for both languages: hero, services, team, process, contact, labels |

Every change goes into both languages. Bulgarian is written for Bulgarian readers, not
translated line by line.

## How to work

1. Read the current text in both languages before proposing anything. The founders edit
   and commit between sessions, so do not rely on an earlier read.
2. Check facts against a source before writing them. Sources, in order: the project's
   repository under github.com/twofold-studio (clone it into the scratchpad; `gh` is not
   installed), the live site, the founders. If a claim cannot be verified, ask.
3. When the user asks "should we change this?" or "is this good?", give an opinion and a
   proposed version, then ask before applying. When they say "apply" or "change it to",
   apply directly.
4. Show the result as the final text in both languages, plus a short note on why each
   change helps. Keep explanations plain.
5. After editing, run `npm run typecheck` and `npm test`. `npm run test:i18n` needs a
   local server and fails inside the sandbox; tell the user to run it.
6. Do not run the formatter (`vp fmt` or `vp check --fix`) on these files. The founders
   wrap lines narrower than the formatter, and it rewraps text you did not touch.
7. Do not commit. The founders commit themselves.

## Voice

- **Plain words over industry words.** Say what the client gets, not how it is built.
  - "scope, price and timeline" became "the price, the deadline and everything that's included"
  - "Front-end developer" became "Web developer"
  - "Docker container", "S3", "MCP", "FFmpeg", "Rust", "Svelte" were removed or replaced
    with "in the cloud", "AI tools", "converts it on the fly"
  - "account manager", "portals, dashboards and integrations" were removed
- **Natural over correct.** If a sentence sounds like a form, a contract or a translation,
  rewrite it the way a person would say it out loud. "We start once you say yes" beats
  "Work starts only once you agree."
- **Short.** One point per sentence. The founders often ask to make a line shorter; aim
  for that from the start. The model line is the services entry they liked most:
  "Apps for phones and computers, for when a browser isn't enough."
- **Story over list.** Sections should connect: a problem, what was built, the hardest
  part. Inside a paragraph, follow one person through it ("buyers narrow the books
  down... Once they've found a book, a simple checkout walks them through each step").
- **Do not repeat facts across a page.** If the summary gives the number of books and the
  languages, the other sections should add something new.
- **Warm but professional.** "We host and look after what we build" was kept over
  "online and up to date" because it sounds like a person who cares.
- **Spell out what a reader could misread.** "Nine designs" sounded like colour themes;
  it became "nine completely different website designs". "Developer" on a software
  studio's site reads as programmer; write "property developer".
- **Vary how pages start.** Two summaries both opened with "Turns…", which read like a
  template. Give each summary its own subject or shape ("Oxevu turns…", "Chapters of
  web novels, read aloud…"). Check the other five projects before settling on a line.
- **One word per thing.** "Machine" and "computer" on the same page is synonym cycling;
  pick one. The same goes for "films" and "movies" (the site uses "films").
- **Idiomatic English (British).** A website "dated from 2012", it did not "was from
  2012". Write "can compare", not a bare "compares", when describing what someone is
  able to do.
- **Do not overpolish.** If the user prefers the old wording, restore it without arguing.
  If text was changed back between sessions (for example "Us, the founders." in the
  first FAQ answer), treat that as the founders' choice and leave it.
- **A founder's bio is theirs.** Suggest changes to Vilian's or Plamen's bio, but apply
  them only when that person agrees.

## Unslop rules that came up most

- No em dashes in body text, in either language. They are fine only as the separator in
  page titles (`seoTitle`, `Twofold — ...`), which a test checks.
- No colons used to join two halves of a sentence. Colons are fine before a list.
- Avoid groups of three by habit (three features, three facts, three adjectives). Use the
  natural number, but the site's layout expects three features per project.
- Avoid template sameness: not every line should follow the same pattern.
- Avoid "not X, but Y" constructions.
- Avoid stacked clauses ("what we'll build, what it costs and when it'll be ready").
- English uses curly apostrophes (’), Bulgarian uses „“ quotes.

## Honesty rules

- Never state something the code or the client cannot back up. Example: Bukinistika's
  catalogue was described as updating itself, but the repository shows a one-time import.
  The text was corrected.
- Do not overclaim. "We build an editor around your content" is accurate because the
  founders set up existing tools (Sanity, Payload CMS) to fit each client; "we build an
  editor" on its own would suggest writing one from scratch.
- Do not invent details such as a city, "first online shop" or a reply time. Ask.
- Demos must read as demos (Arkada).
- Outside help: say "we have trusted people for design and testing", not that they are
  employees.
- Keep numbers consistent everywhere they appear, rounded the same way.

## Things not to mention

- Plamen's employer by name. Use "an online gaming company". A test enforces this.
- The marketplace Bukinistika's books came from. Say the books were collected into
  simple files and loaded at once.
- Project names in general sections such as the FAQ and services. A visitor may not have
  seen the projects yet. Say "a shop that sells in three languages" instead of
  "Bukinistika".
- Personal data of clients.

## Bulgarian

- Address the reader with the polite plural in lower case: вие, ви, ваш. A test enforces
  this.
- Spell "плейър", never "плеър". A test enforces this.
- Avoid borrowed technical words a business owner would not use, such as "хостинг" and
  "обхват". Prefer "поддържаме сайта", "какво е включено".
- Avoid words that mark gender when describing a founder ("самостоятелно", not "сам").
- Watch punctuation: no comma before "и" joining two parts of a sentence, and do not put
  two "или" close together.
- Prefer everyday words: "отново" over "наново", "таблиците ви" over "таблици".
- Headings should sound native. "Отправна точка" was replaced with "Проблемът".
- Use verbs, not chains of nouns. "…означават отделен прозорец, ръчно редактирани файлове
  и резервни копия" became "…всеки е в отделен прозорец, настройките се променят на ръка,
  а резервни копия се правят само когато някой се сети".
- Avoid calques from English: "в движение" (on the fly), "всички достъпи" (all access),
  "изгледа" (the layout), "запазен прогрес" (saved progress). Say what happens instead:
  "докато го пуска", "всички пароли за достъп", "как изглежда сайтът", "продължавате
  оттам, докъдето сте стигнали".
- Open "Трудната част" with "Как…" ("Как да разберем кой говори"), not with a stiff
  "Да се определи…".
- A new sentence needs its own subject. If the subject was inside the previous clause,
  add a linking word ("После добавя…").
- Do not repeat the same verb in one sentence ("Избирате… избира" became "Избирате…
  подбира").
- After a number, masculine nouns for people take the plural, not the count form:
  "седем герои", "трима основатели". The count form is only for things: "девет дизайна",
  "два прозореца". Checked in November 2026; vAIced's "седем герои" is correct.

## Case study pages

The page shows these fields, top to bottom. `story` is kept for context and is not shown.

| Field | Job | Rule |
| --- | --- | --- |
| `kind` | Small label above the title | What the project is · what kind of work ("Pharmacy in Sofia · new website"). Name the category, not the reader: "For property developers" was replaced. No repeated words. |
| `kicker` | Line under the title | The hook. Do not repeat `kind` or `summary`. |
| `summary` | Card text and page lead | What it is and who it serves, in two short sentences. |
| `features` | Three tags | Concrete things a client would look for. No jargon. |
| `challenge` | "The problem" | The situation that was not working. Set up what the next sections answer. |
| `solution` | "What we built" | Follow a user through it. Add new information, do not restate the summary. |
| `result` | "The hard part" | Open with the hard thing as a short phrase, then how it was solved, and end on what the client gains. Name the real difficulty, not a slogan or an abstract idea. |
| captions | Under each screenshot | Describe what is in the picture. Do not repeat the sections. |

### Reference: Bukinistika (approved)

> **kind:** Antiquarian bookseller · online shop
>
> **kicker:** Old books, and every copy is different
>
> **summary:** An online shop for more than 5,000 rare and second-hand books. It runs in
> Bulgarian, English and Russian and ships to buyers in Bulgaria and abroad.
>
> **features:** Bulgarian, English and Russian · No books typed in by hand · Econt, Speedy
> and cash on delivery
>
> **The problem:** Thousands of old books, and every one is a single copy with its own
> condition, photos and price. Some buyers are in Bulgaria, others abroad.
>
> **What we built:** A shop where buyers narrow the books down by condition, language,
> publisher or year, or head straight to the Rare Archive, a darker section for the
> rarest ones. Once they've found a book, a simple checkout walks them through each step.
>
> **The hard part:** Putting more than 5,000 books online without typing a single one by
> hand. We gathered every book, with its photos, condition and price, into simple files
> and loaded them all at once. Since then, the owner adds and edits books right in the
> shop.

Bulgarian:

> **kind:** Антикварна книжарница · онлайн магазин
>
> **kicker:** Стари книги, при които всеки екземпляр е различен
>
> **Проблемът:** Хиляди стари книги, всяка от които е единствен екземпляр със собствено
> състояние, снимки и цена. Част от купувачите са в България, а други в чужбина.
>
> **Какво направихме:** Магазин, в който купувачите стесняват избора по състояние, език,
> издателство и година или отиват направо в „Рядък архив“, по-тъмния раздел с
> най-редките книги. Щом намерят книга, лесната поръчка ги води стъпка по стъпка.

### Reference: Arkada (approved)

A demo, so the label says so, and "The hard part" explains the feature a client cares
about most.

> **kind:** New-build apartment sales · demo
>
> **kicker:** Choose a home straight from the building
>
> **summary:** A sales website for companies building new apartment blocks. Buyers click
> through the building to the exact apartment and see its price, plan and the size of
> every room.
>
> **features:** 3D building model · Nine complete website designs · Bulgarian and English
>
> **The problem:** Buyers of new-build apartments in Sofia usually get a PDF price list
> and a phone number.
>
> **What we built:** Buyers start at the front of the building, pick a floor and see
> which apartments are still free, on a plan or in 3D. They compare a few, then send a
> question or ask for a viewing. The sales team updates prices and availability
> themselves.
>
> **The hard part:** Making nine completely different website designs share one set of
> apartments and prices. A Versions button switches any page to another design, so a
> developer can compare real pages before choosing one. The apartments are entered once
> and work in every design.

Bulgarian:

> **kind:** Продажба на нови жилища · демо сайт
>
> **Трудната част:** Девет изцяло различни дизайна на сайта, които използват едни и същи
> апартаменти и цени. Бутонът „Версии“ превключва всяка страница към друг дизайн, така че
> инвеститорът сравнява истински страници, преди да избере. Апартаментите се въвеждат
> веднъж и работят във всеки дизайн.

## Tests that check the copy

`tests/locales.test.ts` fails if:

- Vilian's bio loses "50", or Plamen's bio loses "2024" or "cybersecurity"/"киберсигурност"
- a founder bio names a current employer
- catalogue figures drift: "3,646", "about 3,600", "около 3600" or "4,000" appear
- Bulgarian uses capitalised Вие/Ви or the spelling "плеър"

If a test blocks a change the user asked for, explain what the test protects, then update
it only if the change keeps that protection (for example, blocking the outdated figure
instead of the new one).

## Still open (November 2026)

- All six case studies were rewritten by 19 November 2026. The `story` fields (not
  shown on the site) still use technical words; tidy them only if they get displayed.
- vAIced's Mother of Learning figures (461 lines, 9 scenes) come from its repository,
  which is not under twofold-studio. Do not use the marketing figures on vaiced.com
  ("10K+ stories", "500+ users") unless the founders confirm them.
- Confirm that all three marketplace seller pages used for Bukinistika belong to the
  owner.
- Vilian's bio repeats "build" and uses "backend systems". Suggested, waiting for his
  OK: "Builds web and desktop apps, customer portals and the servers behind them. More
  than 50 websites and services so far." Keep "50": a test checks it.
- The contact email is a gmail address and the site runs on a personal subdomain. The
  founders know; it needs their decision, not a copy change.
