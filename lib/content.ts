/**
 * Everything the page says lives here. Components only lay it out.
 *
 * Sources:
 * - Arkada, Helios and Bukinistika copy and screenshots come from
 *   Vilian's portfolio (Gitadel: fractal-tess/portfolio-v2, lib/portfolio-data.ts).
 * - Plamen's projects come from github.com/PlamenErmenkov (README files).
 * - vAIced copy and screenshots come from Gitadel: fractal-tess/vaiced (README, assets/screenshots).
 */

export const studio = {
  /** Working name. Change it here and it changes everywhere. */
  name: "Twofold",
  location: "Sofia, Bulgaria",
  email: "vgfractal@gmail.com",
  url: "https://twofold.fractal-tess.xyz",
  description:
    "A two-person software studio building websites, mobile and desktop apps, backend services and integrations. Based in Sofia.",
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
  /** What the project includes, in plain words. */
  features: string[];
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
      "Because it is a sales demo, it comes in nine different designs with the same content behind them. A “Versions” button on every page shows that page in another design, so a developer can choose a look by clicking through real pages instead of mockups. The sales team can update apartments, prices and availability themselves at any time.",
    ],
    features: ["3D building model", "Self-service editing", "Bulgarian / English"],
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
      "The new site is fast and fully in Bulgarian. The whole catalogue can be searched by name, abbreviation, potency or first letter, and each remedy shows its forms with their prices. Customers put remedies, kits and books into one request and send it to the pharmacy. The staff update products, prices and opening hours themselves, whenever they need to, and everything from the old site and the spreadsheets was carried over.",
    ],
    features: ["Searchable catalogue", "Self-service editing", "Order requests"],
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
      "An online shop for antique and rare books in Bulgarian, English and Russian, with a catalogue that keeps itself up to date.",
    story: [
      "Bukinistika sells antique and rare books. The shop runs in Bulgarian, English and Russian, and antiquarian copies get their own darker room, the rare archive.",
      "The catalogue of about 5,000 copies updates itself automatically from the listings it started from. Checkout begins by asking whether the books stay in Bulgaria or go abroad, and the owner can find any copy by condition, language, publisher or category.",
    ],
    features: ["Online shop", "Automatic catalogue updates", "Bulgarian / English / Russian"],
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
          "The owner's book list: about 5,000 copies, searchable by condition, language, publisher and category.",
      },
    ],
  },
  {
    slug: "vaiced",
    name: "vAIced",
    kicker: "stories, spoken",
    kind: "Our own product · Vilian & Plamen",
    summary:
      "Our own product, built together: web novels turned into audiobooks, with a different voice for every character.",
    story: [
      "vAIced is a product the two of us are building together. It reads a chapter of a web novel, works out who says each line, gives every character their own AI voice and turns the chapter into an audiobook you can play in the browser.",
      "The first finished chapter, from Mother of Learning, has 461 lines across 9 scenes, with seven characters and a narrator. The player highlights each line as it is read, colours it by speaker and shows a picture for every scene. The public site, with a waiting list, is live at vaiced.com.",
    ],
    features: ["A voice for every character", "Story player", "Website and waiting list"],
    builtBy: "Vilian Gerdzhikov & Plamen Ermenkov, together",
    link: { label: "vaiced.com", href: "https://vaiced.com" },
    cover: "/work/vaiced/hero.webp",
    images: [
      {
        src: "/work/vaiced/hero.webp",
        caption:
          "The story player on chapter 1 of Mother of Learning: the scenes, the cast and every line coloured by who is speaking.",
      },
      {
        src: "/work/vaiced/player.webp",
        caption:
          "Every line tagged with who is speaking, and the current one highlighted as it plays.",
      },
      {
        src: "/work/vaiced/website.webp",
        caption: "The vaiced.com landing page, with a sample player.",
      },
    ],
  },
];

export interface Service {
  title: string;
  proof: string;
}

export const services: Service[] = [
  { title: "Websites you can edit yourself", proof: "Helios · Arkada" },
  { title: "Catalogues and online shops", proof: "Bukinistika · Helios" },
  { title: "Sales tools in 3D", proof: "Arkada" },
  { title: "Customer accounts and secure payments", proof: "Secure sign-in · card checkout" },
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
    role: "Websites, apps and servers",
    photo: "/team/vilian.webp",
    bio: "Builds web and desktop applications and works on CarrierX's customer portal and backend. Has built over 50 websites and services.",
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
    role: "Web apps and security",
    photo: "/team/plamen.webp",
    bio: "Advanced Software Engineer at Palms Bet, with a degree in cybersecurity. Builds web applications, with experience in secure sign-in and card payments.",
    facts: [
      "Thesis · secure sign-in",
      "Payments · secure card checkout",
      "Java · C · TypeScript · PHP",
    ],
    links: [{ label: "GitHub", href: "https://github.com/PlamenErmenkov" }],
  },
];

export const faqs = [
  {
    question: "Who will we actually be working with?",
    answer:
      "The two of us. There is no account manager in between: the people on the call are the people building your product, and you can see both of us on this page.",
  },
  {
    question: "Can our own staff update the site afterwards?",
    answer:
      "Yes, that is usually the point. You get a simple editor and full control: change text, photos, products and prices yourself, at any hour, without waiting on us. Helios's staff look after 3,600 products, prices and opening hours this way.",
  },
  {
    question: "Do you build in Bulgarian?",
    answer:
      "Yes. Helios is in Bulgarian, Arkada in Bulgarian and English, and Bukinistika in Bulgarian, English and Russian. Languages are edited side by side, so adding one later means adding translations, not rebuilding the site.",
  },
  {
    question: "We already have content in an old site or a spreadsheet.",
    answer:
      "Good. We move it over for you. Helios's old pages and remedy spreadsheets were carried into the new site, and Bukinistika's catalogue updates itself from its original listings.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We can host it for you on the best, cheapest hosting that fits the project and keep it up to date, or hand everything over to you. Either way, the site is yours.",
  },
  {
    question: "How do we start?",
    answer:
      "Email us what you have today: the website, the spreadsheet, the PDF, whatever customers see now. We will reply with what we would build first and roughly what it takes.",
  },
] as const;
