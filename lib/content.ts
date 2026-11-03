/**
 * Everything the page says lives here. Components only lay it out.
 *
 * Sources:
 * - Arkada, Helios and Bukinistika copy and screenshots come from
 *   Vilian's portfolio (Gitadel: fractal-tess/portfolio-v2, lib/portfolio-data.ts).
 * - Plamen's projects come from github.com/PlamenErmenkov (README files).
 */

export const studio = {
  /** Working name. Change it here and it changes everywhere. */
  name: "Twofold",
  location: "Sofia, Bulgaria",
  email: "vgfractal@gmail.com",
  url: "https://twofold.fractal-tess.xyz",
  description:
    "A two-person software studio in Sofia. We build websites, catalogues, shops and sales tools for businesses that have outgrown a PDF price list, a spreadsheet or a 2012 website.",
} as const;

export interface WorkImage {
  src: string;
  caption: string;
}

export interface Work {
  slug: string;
  name: string;
  /** Short italic line under the name in the big heading. */
  kicker: string;
  /** What kind of client or job it was. */
  kind: string;
  summary: string;
  /** Paragraphs for the detail view. */
  story: string[];
  stack: string[];
  builtBy: string;
  link?: { label: string; href: string };
  cover: string;
  images: WorkImage[];
}

export const work: Work[] = [
  {
    slug: "arkada",
    name: "Arkada",
    kicker: "new-build sales",
    kind: "Residential developer · sales demo",
    summary:
      "Buyers pick a building from its facade, a floor from the plan or a 3D model, and an apartment with its price and room areas.",
    story: [
      "Buyers of new-build apartments in Sofia usually get a PDF price list and a phone number. Arkada shows the same offer as a site: pick a building from its facade, a floor from the plan or a 3D model, and an apartment with its price and room areas, then compare and send an enquiry.",
      "It is a sales demo, so it comes in nine visual directions over the same content and the same Payload CMS. A “Versions” button on every page opens that page in another design, so a developer chooses a look by clicking through real pages instead of mockups.",
    ],
    stack: ["Next.js", "Payload CMS", "Three.js", "BG / EN"],
    builtBy: "Twofold",
    link: { label: "arkadia.fractal-tess.xyz", href: "https://arkadia.fractal-tess.xyz" },
    cover: "/work/arkada/hero.webp",
    images: [
      {
        src: "/work/arkada/hero.webp",
        caption:
          "The Green version's home page, with the 3D version's Lipa Park page in front: the building model and what is left on each floor.",
      },
      {
        src: "/work/arkada/apartment.webp",
        caption:
          "Apartment A401, opened from the building model: its rooms in 3D, the floor plan, the price and every room's area.",
      },
      {
        src: "/work/arkada/project.webp",
        caption: "Lipa Park: homes available, the price range and the floor chooser.",
      },
      {
        src: "/work/arkada/phones.webp",
        caption: "The home page, the 3D building model and a project page on three phones.",
      },
    ],
  },
  {
    slug: "helios",
    name: "Helios",
    kicker: "homeopharm",
    kind: "Pharmacy in Sofia · website rebuild",
    summary:
      "A 2012 website and a spreadsheet download became a searchable catalogue of 3,646 remedies, with a price for every form.",
    story: [
      "Helios Homeopharm is a homeopathic pharmacy in Sofia whose website dated from 2012. Its catalogue of about 3,600 remedies was only available as a spreadsheet you downloaded.",
      "The new site is a static Bulgarian website built from Sanity. The whole catalogue is searchable by name, abbreviation, potency or first letter, and each remedy shows its forms with their prices. Customers put remedies, kits and books into one request and send it to the pharmacy by email. The staff keep products, prices and opening hours up to date in Sanity Studio, and the old site's pages and spreadsheets were imported into it.",
    ],
    stack: ["Next.js", "Sanity", "Tailwind CSS", "Static export"],
    builtBy: "Twofold",
    link: { label: "helios.fractal-tess.xyz", href: "https://helios.fractal-tess.xyz" },
    cover: "/work/helios/hero.webp",
    images: [
      {
        src: "/work/helios/hero.webp",
        caption:
          "The home page with its catalogue search and potency ruler, and the catalogue in front with Arnica montana open at 30CH.",
      },
      {
        src: "/work/helios/bento.webp",
        caption:
          "The product groups: the 3,646-remedy catalogue, forms with their price ranges, kits and Bach drops.",
      },
      {
        src: "/work/helios/request.webp",
        caption:
          "A request: the chosen items with quantities and an estimated total, next to the contact form.",
      },
      {
        src: "/work/helios/phones.webp",
        caption: "The home, catalogue and kits pages on three phones.",
      },
    ],
  },
  {
    slug: "bukinistika",
    name: "Bukinistika",
    kicker: "rare books",
    kind: "Antiquarian bookshop · online store",
    summary:
      "An online shop for antique and rare books in Bulgarian, English and Russian, kept in step with its source listings by a scraper.",
    story: [
      "Bukinistika sells antique and rare books. The shop runs in Bulgarian, English and Russian, and antiquarian copies get their own darker room, the rare archive.",
      "A Python scraper keeps the catalogue of about 5,000 copies in step with the listings it started from. Checkout begins by asking whether the books stay in Bulgaria or go abroad, and the admin can search and filter every copy by condition, language, publisher and category.",
    ],
    stack: ["Next.js", "PocketBase", "Python", "BG / EN / RU"],
    builtBy: "Twofold",
    cover: "/work/bukinistika/hero.webp",
    images: [
      {
        src: "/work/bukinistika/hero.webp",
        caption: "The catalogue in Bulgarian, with a 1947 Taso Primo first edition open in front.",
      },
      {
        src: "/work/bukinistika/rare-archive.webp",
        caption: "The rare archive: antiquarian copies get their own darker room.",
      },
      {
        src: "/work/bukinistika/checkout.webp",
        caption: "Checkout starts by asking whether the books stay in Bulgaria or go abroad.",
      },
      {
        src: "/work/bukinistika/admin.webp",
        caption:
          "The admin book list: about 5,000 copies, searchable and filterable by condition, language, publisher and category.",
      },
    ],
  },
  {
    slug: "3ds2",
    name: "3-D Secure",
    kicker: "checkout flow",
    kind: "Payments · teaching demo",
    summary:
      "A merchant checkout that walks through EMV 3-D Secure 2: frictionless approval for low-risk carts, an OTP challenge for risky ones.",
    story: [
      "A front-end demo of how EMV 3-D Secure 2 decides whether a card payment needs a second step. The shop scores each cart for risk as you go.",
      "Low-risk transactions pass frictionlessly; high-risk ones get a one-time-password challenge. Every step is shown as a status update and written to a system event log, so you can watch the protocol make its decisions.",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    builtBy: "Plamen Ermenkov",
    link: { label: "GitHub", href: "https://github.com/PlamenErmenkov/3ds2-project" },
    cover: "/work/plamen/3ds2.webp",
    images: [
      {
        src: "/work/plamen/3ds2.webp",
        caption:
          "The demo shop: each product is tagged low or high risk, which decides between frictionless approval and an OTP challenge.",
      },
    ],
  },
];

export interface Service {
  title: string;
  proof: string;
}

export const services: Service[] = [
  { title: "Websites your staff can run", proof: "Helios · Sanity" },
  { title: "Catalogues and online shops", proof: "Bukinistika · Helios" },
  { title: "Sales tools in 3D", proof: "Arkada · Three.js" },
  { title: "Sign-in, accounts and payments", proof: "Meridian · 3-D Secure" },
  { title: "Hosting and upkeep", proof: "Best hosting, lowest cost" },
];

export interface Founder {
  name: string;
  role: string;
  photo: string;
  bio: string;
  facts: string[];
  links: { label: string; href: string }[];
}

export const founders: Founder[] = [
  {
    name: "Vilian Gerdzhikov",
    role: "Fullstack · infrastructure",
    photo: "/team/vilian.webp",
    bio: "Core developer at CarrierX, where he moved a decade-old customer portal from Ember to React and is rewriting the Rails backend in TypeScript. Writes Rust on the desktop and runs his own servers, including Gitadel, the Git forge this studio's code lives on.",
    facts: [
      "Schwarz Hackathon · 1st place",
      "AmCham Hackathon 2.0 · Best Team",
      "AmCham Hackathon 3.0 · Most Innovative",
    ],
    links: [
      { label: "fractal-tess.xyz", href: "https://fractal-tess.xyz" },
      { label: "GitHub", href: "https://github.com/Fractal-Tess" },
    ],
  },
  {
    name: "Plamen Ermenkov",
    role: "Fullstack · security",
    photo: "/team/plamen.webp",
    bio: "Builds Next.js applications on Prisma and PostgreSQL, and wrote his thesis on secure sign-in: email confirmation, account lockout, two-factor and magic links. His earlier work in Java and C covers sockets, threads and inter-process messaging.",
    facts: ["Thesis · secure authentication", "Payments · 3-D Secure 2", "Java · C · TypeScript · PHP"],
    links: [{ label: "GitHub", href: "https://github.com/PlamenErmenkov" }],
  },
];

export const faqs = [
  {
    question: "Who will we actually be working with?",
    answer:
      "The two of us. There is no account manager in between: the people on the call are the people writing the code, and you can see both of us on this page.",
  },
  {
    question: "Can our own staff update the site afterwards?",
    answer:
      "Yes, that is usually the point. Helios's staff keep 3,600 products, prices and opening hours current in Sanity Studio; Arkada's apartments, prices and availability live in Payload CMS. You get an editor, not a ticket queue.",
  },
  {
    question: "Do you build in Bulgarian?",
    answer:
      "Yes. Helios is in Bulgarian, Arkada in Bulgarian and English, and Bukinistika in Bulgarian, English and Russian. Translations live next to each other in the CMS, so a new language is content work rather than a rebuild.",
  },
  {
    question: "We already have content in an old site or a spreadsheet.",
    answer:
      "Good. We import it. Helios's old WordPress pages and its remedy spreadsheets went straight into the new CMS, and Bukinistika's catalogue is kept in sync by a scraper.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We can host it for you on the best, cheapest hosting that fits the project and keep it updated, or hand it over to you with the code and the deploy setup. Either way you own the code.",
  },
  {
    question: "How do we start?",
    answer:
      "Email us what you have today: the website, the spreadsheet, the PDF, whatever customers see now. We will reply with what we would build first and roughly what it takes.",
  },
] as const;
