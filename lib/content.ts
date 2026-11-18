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
    "Websites, online shops and custom software built around your business. Work directly with the founders, in Sofia.",
  /** Shorter line for link previews (Open Graph). */
  shareDescription: "Websites and software built around your business. Founder-led, in Sofia.",
} as const;

export interface WorkImage {
  src: string;
  caption: string;
}

export interface Work {
  slug: string;
  name: string;
  /** Short line under the project name, in the accent colour. */
  kicker: string;
  /** A compact problem-and-benefit summary, also shown on phones. */
  summary: string;
  /** Documented project type and status; do not imply a client relationship. */
  kind: string;
  /** Page title for the case study in search results and link previews. */
  seoTitle: string;
  /** A product we own, rather than work for another business. */
  own?: boolean;
  /** Case study: the starting point, the build and what it enables. */
  challenge: string;
  solution: string;
  result: string;
  /** Source narrative retained for context when updating the concise case study. */
  story: string[];
  /** What the project includes, in plain words. */
  features: string[];
  year: string;
  link?: { label: string; href: string };
  cover: string;
  images: WorkImage[];
}

export const work: Work[] = [
  {
    slug: "chunkyard",
    name: "Chunkyard",
    kicker: "Minecraft server management",
    summary:
      "Manage several Minecraft servers from one dashboard, with a live console and backups instead of separate terminals.",
    kind: "Our own product",
    seoTitle: "Chunkyard — self-hosted Minecraft server management",
    own: true,
    challenge: "Run several Minecraft Java servers without juggling terminals and config files.",
    solution:
      "Install server software, follow the console, and edit server settings from one web dashboard.",
    result:
      "Each server runs in its own Docker container, with readiness checks and local or S3-compatible backups.",
    story: [
      "Chunkyard manages Minecraft Java Edition servers on your own hardware. It supports Vanilla, Paper, Purpur, Fabric, Forge, NeoForge and supported CurseForge packs.",
      "The dashboard shows when Minecraft is ready for players, streams console output and keeps a history of server.properties edits. Owner API keys also give scripts and MCP clients access to server controls.",
    ],
    features: ["Software installers", "Live console and resource charts", "Local and S3 backups"],
    year: "2026",
    link: {
      label: "View Chunkyard on GitHub",
      href: "https://github.com/twofold-studio/chunkyard",
    },
    cover: "/work/chunkyard/console.webp",
    images: [
      {
        src: "/work/chunkyard/hero.webp",
        caption: "The server inventory and live resource readings for Vanilla Survival.",
      },
      {
        src: "/work/chunkyard/console.webp",
        caption: "Live startup output from a running Paper server.",
      },
    ],
  },
  {
    slug: "oxevu",
    name: "Oxevu",
    kicker: "Media library & web player",
    summary:
      "Turn existing media folders into a searchable library, with a browser player that remembers where you left off.",
    kind: "Our own product · in development",
    seoTitle: "Oxevu — a self-hosted media library and player",
    own: true,
    challenge: "Browse and play the movies and shows stored on your home server.",
    solution:
      "Oxevu scans existing media folders and gives them a searchable library and browser player.",
    result:
      "Pick up where you left off, play original files or transcode them, and watch together.",
    story: [
      "Oxevu is a self-hosted media library and player in active development. A Rust server scans your media folders without changing the files, and a Svelte web interface lets you browse the catalog and play what you find.",
      "The web player saves progress and supports original-file playback, FFmpeg transcoding and watch parties.",
    ],
    features: ["Read-only library scans", "Resume playback", "Watch parties"],
    year: "2026",
    link: { label: "View Oxevu on GitHub", href: "https://github.com/twofold-studio/oxevu" },
    cover: "/work/oxevu/discover.webp",
    images: [
      {
        src: "/work/oxevu/hero.webp",
        caption: "The movie library with the Arcane series page in front.",
      },
      {
        src: "/work/oxevu/discover.webp",
        caption: "Discover with filters for year, genre, rating and language.",
      },
      { src: "/work/oxevu/seasons.webp", caption: "Arcane’s season artwork and episode counts." },
      {
        src: "/work/oxevu/mobile.webp",
        caption: "Movies, series and Arcane details in the mobile web interface.",
      },
    ],
  },
  {
    slug: "bukinistika",
    name: "Bukinistika",
    kicker: "Multilingual online shop",
    summary:
      "A shop in three languages brings over 4,000 books online, with less manual catalogue work.",
    kind: "Antiquarian bookshop · online store",
    seoTitle: "Bukinistika — an online shop for rare books in three languages",
    challenge:
      "Over 4,000 rare and antiquarian books that needed to reach buyers in Bulgaria and abroad.",
    solution:
      "An online shop in Bulgarian, English and Russian, with a separate Rare Archive for antiquarian copies.",
    result:
      "The catalogue updates itself from the original listings, and the owner can find any copy by condition, language, publisher or category.",
    story: [
      "Bukinistika sells antique and rare books. The shop runs in Bulgarian, English and Russian, and antiquarian copies have their own darker section, the Rare Archive.",
      "The catalogue of over 4,000 copies updates itself automatically from the listings it started from. Checkout begins by asking whether the books stay in Bulgaria or go abroad, and the owner can find any copy by condition, language, publisher or category.",
    ],
    features: ["Online shop", "Automatic catalogue updates", "Bulgarian / English / Russian"],
    year: "2026",
    link: { label: "Visit bukinistika.com", href: "https://bukinistika.com" },
    cover: "/work/bukinistika/hero.webp",
    images: [
      {
        src: "/work/bukinistika/hero.webp",
        caption: "The catalogue in Bulgarian, with a 1947 Taso Primo first edition open in front.",
      },
      {
        src: "/work/bukinistika/rare-archive.webp",
        caption: "The Rare Archive: a separate, darker section for antiquarian copies.",
      },
      {
        src: "/work/bukinistika/checkout.webp",
        caption: "Checkout starts by asking whether the books stay in Bulgaria or go abroad.",
      },
      {
        src: "/work/bukinistika/admin.webp",
        caption:
          "The owner's book list: over 4,000 copies, searchable by condition, language, publisher and category.",
      },
    ],
  },
  {
    slug: "arkada",
    name: "Arkada",
    kicker: "Interactive property website",
    summary: "From PDF price lists to apartment search, 3D views and direct enquiries.",
    kind: "For residential developers · sales demo",
    seoTitle: "Arkada — a 3D sales site for new-build apartments",
    challenge: "New-build buyers usually get a PDF price list and a phone number.",
    solution:
      "A site where buyers pick a building, floor and apartment from the facade, the floor plan or a 3D model, and see the price and every room's area.",
    result:
      "The sales team can update prices and availability itself, and a developer can choose between nine designs by clicking through real pages.",
    story: [
      "Buyers of new-build apartments in Sofia usually get a PDF price list and a phone number. Arkada shows the same offer as a site: pick a building from its facade, a floor from the plan or a 3D model, and an apartment with its price and room areas, then compare and send an enquiry.",
      "Because it is a sales demo, it comes in nine different designs with the same content behind them. A “Versions” button on every page shows that page in another design, so a developer can choose a look by clicking through real pages instead of mockups. The sales team can update apartments, prices and availability themselves at any time.",
    ],
    features: ["3D building model", "Self-service editing", "Bulgarian / English"],
    year: "2026",
    link: { label: "Open the demo", href: "https://arkadia.fractal-tess.xyz" },
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
    kicker: "Website & searchable catalogue",
    summary:
      "A searchable catalogue replaces spreadsheet downloads. Customers find products and send a single request.",
    kind: "Pharmacy in Sofia · website rebuild",
    seoTitle: "Helios — a searchable catalogue for a homeopathic pharmacy",
    challenge:
      "A 2012 website, and a catalogue of over 3,600 remedies available only as a spreadsheet download.",
    solution:
      "A new site with a catalogue searchable by name, abbreviation, potency or first letter, showing every remedy's forms and prices.",
    result:
      "Customers can order several items in one request, and the staff can update products, prices and opening hours themselves.",
    story: [
      "Helios Homeopharm is a homeopathic pharmacy in Sofia whose website dated from 2012. Its catalogue of over 3,600 remedies was only available as a spreadsheet you downloaded.",
      "The new site is fast and fully in Bulgarian. The whole catalogue can be searched by name, abbreviation, potency or first letter, and each remedy shows its forms with their prices. Customers put remedies, kits and books into one request and send it to the pharmacy. The staff can update products, prices and opening hours themselves, whenever they need to, and everything from the old site and the spreadsheets has been carried over.",
    ],
    features: ["Searchable catalogue", "Self-service editing", "Order requests"],
    year: "2026",
    link: { label: "View the new site", href: "https://helios.fractal-tess.xyz" },
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
          "The product groups: a catalogue of over 3,600 remedies, forms with their price ranges, kits and Bach drops.",
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
    slug: "vaiced",
    name: "vAIced",
    kicker: "AI audio & story player",
    summary:
      "Turn web-novel chapters into audio with a different voice for each character and a player that follows the text.",
    kind: "Our own product · beta",
    seoTitle: "vAIced — web novels turned into audiobooks",
    own: true,
    challenge: "Let readers listen to web novels with a distinct voice for every character.",
    solution: "It works out who speaks each line and gives every character their own AI voice.",
    result:
      "The first finished chapter of Mother of Learning: 461 lines across 9 scenes, with seven characters and a narrator. Now in beta, with an early-access list at vaiced.com.",
    story: [
      "vAIced is Twofold's own product. It reads a chapter of a web novel, works out who says each line, gives every character their own AI voice and turns the chapter into an audiobook you can play in the browser.",
      "The first finished chapter, from Mother of Learning, has 461 lines across 9 scenes, with seven characters and a narrator. The player highlights each line as it is read, colours it by speaker and shows a picture for every scene. The public site, with an early-access list, is live at vaiced.com.",
    ],
    features: ["A voice for every character", "Story player", "Website and early-access list"],
    year: "2026",
    link: { label: "Visit vaiced.com", href: "https://vaiced.com" },
    cover: "/work/vaiced/website.webp",
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

/** The homepage selection; all six detail URLs remain available from the Work index. */
export const featuredSlugs = ["bukinistika", "helios", "arkada"] as const;

export function featuredWork(items: Work[]): Work[] {
  return featuredSlugs.map((slug) => items.find((item) => item.slug === slug)!);
}

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
    role: "Co-founder · Websites, apps and servers",
    photo: "/team/vilian.webp",
    bio: "Builds web and desktop applications, customer portals and backend systems. Has built more than 50 websites and services.",
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
    role: "Co-founder · Web apps and security",
    photo: "/team/plamen.webp",
    bio: "Front-end developer with a degree in cybersecurity. Builds web applications, with experience in secure sign-in and card payments.",
    facts: [
      "Thesis · secure sign-in",
      "Payments · secure card checkout",
      "TypeScript · React · Next.js · PostgreSQL",
    ],
    links: [
      { label: "plamen.codes", href: "https://www.plamen.codes" },
      { label: "GitHub", href: "https://github.com/PlamenErmenkov" },
    ],
  },
];

export const faqs = [
  {
    question: "Who will we be working with?",
    answer:
      "The engineers who build your product. There's no account manager in between: the people on the call are the people writing the code. When a project needs it, we bring in specialists for design and testing.",
  },
  {
    question: "Can our team update the content ourselves?",
    answer:
      "Usually, yes: that's the point. You get a straightforward editor and change text, photos, products and prices yourselves, whenever you need to. Helios's new site, for example, lets the staff manage more than 3,600 remedies, their prices and the opening hours.",
  },
  {
    question: "Can you build in Bulgarian and other languages?",
    answer:
      "Yes. Helios is in Bulgarian, Arkada in Bulgarian and English, and Bukinistika in Bulgarian, English and Russian. Languages are edited side by side, so adding one later means translating, not rebuilding.",
  },
  {
    question: "What about the content we already have?",
    answer:
      "We move it across for you. Helios's old pages and remedy spreadsheets were carried into the new site, and Bukinistika's catalogue updates itself from its original listings.",
  },
  {
    question: "What happens after launch?",
    answer:
      "There are two options. We host and maintain it on a server chosen to fit the project and its budget, or we hand everything over to you. Either way, it's entirely yours.",
  },
  {
    question: "How do we start?",
    answer:
      "Send us a short description of the project and anything you already have: a website, a spreadsheet, a PDF. We start with a short conversation. After it, you receive a written proposal with the scope, timeline and price.",
  },
] as const;
