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
  /** Short line under the project name, in the accent colour: what makes it worth a look. */
  kicker: string;
  /** One sentence on what it does for people; the card, the case-study lead and the meta description. */
  summary: string;
  /** Who it is for and its status; do not imply a client relationship. Must not repeat the kicker. */
  kind: string;
  /** Page title for the case study in search results and link previews. */
  seoTitle: string;
  /** A product we own, rather than work for another business. */
  own?: boolean;
  /**
   * Case study columns: the starting point, what we built, and the hard part
   * (the detail that shows the engineering judgement behind it).
   */
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
      "Several Minecraft servers on your own hardware, each in its own Docker container, run from one dashboard with a live console and backups.",
    kind: "Our own product",
    seoTitle: "Chunkyard — self-hosted Minecraft server management",
    own: true,
    challenge:
      "Several Minecraft Java servers on one machine usually means a terminal for each, config files edited by hand, and backups made whenever someone remembers.",
    solution:
      "A web dashboard that installs Vanilla, Paper, Purpur, Fabric, Forge, NeoForge and CurseForge packs, streams each console live, charts resource use and keeps a history of server.properties edits.",
    result:
      "Knowing when a server is really ready. A started Docker container doesn’t mean players can join, so Chunkyard shows a server as ready only once Minecraft answers a Server List Ping, the same check the game itself uses.",
    story: [
      "Chunkyard manages Minecraft Java Edition servers on your own hardware. It supports Vanilla, Paper, Purpur, Fabric, Forge, NeoForge and supported CurseForge packs.",
      "The dashboard shows when Minecraft is ready for players, streams console output and keeps a history of server.properties edits. Owner API keys also give scripts and MCP clients access to server controls.",
    ],
    features: ["Live console and charts", "Local and S3 backups", "API keys for scripts and MCP"],
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
    kicker: "Media library and web player",
    summary:
      "Turns the film and series folders on a home server into a searchable library, with a browser player that remembers where you stopped.",
    kind: "Our own product · in development",
    seoTitle: "Oxevu — a self-hosted media library and player",
    own: true,
    challenge:
      "Films and series on a home server are just folders of files: no artwork, no search and no record of what you’ve watched.",
    solution:
      "A Rust server scans the folders, and a Svelte web app turns them into a library you can browse and play, with saved progress and watch parties.",
    result:
      "Leaving your files alone. Scans are read-only, so nothing in your folders is renamed or moved, and the player streams the original file or transcodes it with FFmpeg.",
    story: [
      "Oxevu is a self-hosted media library and player in active development. A Rust server scans your media folders without changing the files, and a Svelte web interface lets you browse the catalogue and play what you find.",
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
    kicker: "Rare books in three languages",
    summary:
      "More than 4,000 antiquarian and rare books for sale in Bulgarian, English and Russian, with a catalogue that keeps itself up to date.",
    kind: "Antiquarian bookshop · online shop",
    seoTitle: "Bukinistika — an online shop for rare books in three languages",
    challenge:
      "More than 4,000 antiquarian books, each copy with its own condition and price, and buyers both in Bulgaria and abroad.",
    solution:
      "An online shop in Bulgarian, English and Russian. Antiquarian copies have their own darker section, the Rare Archive, and checkout starts by asking whether the books stay in Bulgaria or go abroad.",
    result:
      "Keeping thousands of single copies accurate without retyping them. The catalogue updates itself from the original listings, and the owner can find any book by condition, language, publisher or category.",
    story: [
      "Bukinistika sells antique and rare books. The shop runs in Bulgarian, English and Russian, and antiquarian copies have their own darker section, the Rare Archive.",
      "The catalogue of over 4,000 copies updates itself automatically from the listings it started from. Checkout begins by asking whether the books stay in Bulgaria or go abroad, and the owner can find any copy by condition, language, publisher or category.",
    ],
    features: [
      "Bulgarian, English and Russian",
      "Self-updating catalogue",
      "Checkout for Bulgaria or abroad",
    ],
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
        caption: "The first of four checkout steps: delivery in Bulgaria or abroad.",
      },
      {
        src: "/work/bukinistika/admin.webp",
        caption:
          "The owner’s book list, with filters, a rare-books-only switch and the stock of every copy.",
      },
    ],
  },
  {
    slug: "arkada",
    name: "Arkada",
    kicker: "Apartments chosen from a 3D building",
    summary:
      "Buyers pick a building, floor and apartment from a 3D model and see its price, plan and room areas, instead of reading a PDF price list.",
    kind: "For residential developers · sales demo",
    seoTitle: "Arkada — a 3D sales site for new-build apartments",
    challenge:
      "Buyers of new-build apartments in Sofia usually get a PDF price list and a phone number.",
    solution:
      "A sales site where buyers go from a building’s facade to a floor and an apartment, on a plan or in a 3D model, then compare and send an enquiry. The sales team can change prices and availability at any time.",
    result:
      "Nine designs, one set of data. The demo comes in nine visual versions, and a Versions button shows the same page in another design, so a developer chooses a look by clicking through real pages rather than mockups.",
    story: [
      "Buyers of new-build apartments in Sofia usually get a PDF price list and a phone number. Arkada shows the same offer as a site: pick a building from its facade, a floor from the plan or a 3D model, and an apartment with its price and room areas, then compare and send an enquiry.",
      "Because it is a sales demo, it comes in nine different designs with the same content behind them. A “Versions” button on every page shows that page in another design, so a developer can choose a look by clicking through real pages instead of mockups. The sales team can update apartments, prices and availability themselves at any time.",
    ],
    features: ["3D building model", "Nine switchable designs", "Bulgarian and English"],
    year: "2026",
    link: { label: "Open the demo", href: "https://arkadia.fractal-tess.xyz" },
    cover: "/work/arkada/hero.webp",
    images: [
      {
        src: "/work/arkada/hero.webp",
        caption:
          "The Green version’s home page, with the 3D version’s Lipa Park page in front: the building model and what is left on each floor.",
      },
      {
        src: "/work/arkada/apartment.webp",
        caption:
          "Apartment A401, opened from the building model: its rooms in 3D, the floor plan, the price and every room’s area.",
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
    kicker: "From spreadsheet to searchable catalogue",
    summary:
      "More than 3,600 remedies, previously a spreadsheet download, in a catalogue customers can search by name, potency or first letter.",
    kind: "Pharmacy in Sofia · website rebuild",
    seoTitle: "Helios — a searchable catalogue for a homeopathic pharmacy",
    challenge:
      "A website from 2012, and a catalogue of more than 3,600 remedies that customers could only get as a spreadsheet download.",
    solution:
      "A new site, fully in Bulgarian, where every remedy shows its forms and prices. Customers put remedies, kits and books into one request, and the staff can update products, prices and opening hours themselves.",
    result:
      "Making 3,600 remedies, each in several potencies and forms, easy to search. Customers look them up by name, abbreviation, potency or first letter, and everything from the old site and the spreadsheets came across.",
    story: [
      "Helios Homeopharm is a homeopathic pharmacy in Sofia whose website dated from 2012. Its catalogue of over 3,600 remedies was only available as a spreadsheet you downloaded.",
      "The new site is fast and fully in Bulgarian. The whole catalogue can be searched by name, abbreviation, potency or first letter, and each remedy shows its forms with their prices. Customers put remedies, kits and books into one request and send it to the pharmacy. The staff can update products, prices and opening hours themselves, whenever they need to, and everything from the old site and the spreadsheets has been carried over.",
    ],
    features: ["Searchable catalogue", "Multi-item requests", "Staff editing"],
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
    kicker: "Audiobooks with a voice for every character",
    summary:
      "Web-novel chapters turned into audio, with a different AI voice for each character and a player that follows the text line by line.",
    kind: "Our own product · beta",
    seoTitle: "vAIced — web novels turned into audiobooks",
    own: true,
    challenge:
      "Letting readers listen to web novels with every character voiced differently, rather than one narrator reading everything.",
    solution:
      "vAIced reads a chapter, works out who says each line and gives every character an AI voice. The browser player highlights each line as it is read, colours it by speaker and shows a picture for every scene.",
    result:
      "Working out who is speaking. Prose often doesn’t name the speaker, and every line needs one before it can be voiced. The first finished chapter, from Mother of Learning, has 461 lines across 9 scenes, seven characters and a narrator.",
    story: [
      "vAIced is Twofold’s own product. It reads a chapter of a web novel, works out who says each line, gives every character their own AI voice and turns the chapter into an audiobook you can play in the browser.",
      "The first finished chapter, from Mother of Learning, has 461 lines across 9 scenes, with seven characters and a narrator. The player highlights each line as it is read, colours it by speaker and shows a picture for every scene. The public site, with an early-access list, is live at vaiced.com.",
    ],
    features: ["A voice per character", "Line-by-line player", "Early-access website"],
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
    bio: "Web developer at an online gaming company since 2024, with a cybersecurity degree from the Technical University of Sofia. Builds everything your customers see and click on, and makes it fast on any device. Takes extra care with sign-in and customer accounts, since that’s where a security background pays off.",
    facts: [
      "Degree in cybersecurity · Technical University of Sofia, 2026",
      "Built a hospital patient portal single-handedly, from the database to its own sign-in and security",
      "Built Bukinistika, Helios and Arkada with Vilian",
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
      "The founders, who also write the code. There’s no account manager in between, so the people on the call are the people building your product. When a project needs it, we bring in specialists for design or testing.",
  },
  {
    question: "Can our team update the content ourselves?",
    answer:
      "Usually, yes. You get a straightforward editor for text, photos, products and prices, so everyday changes don’t have to wait for us. On the new Helios site, for example, the staff can manage more than 3,600 remedies, their prices and the opening hours.",
  },
  {
    question: "Can you build in Bulgarian and other languages?",
    answer:
      "Yes. Helios is in Bulgarian, Arkada in Bulgarian and English, and Bukinistika in Bulgarian, English and Russian. Languages are edited side by side, so adding one later means translating, not rebuilding.",
  },
  {
    question: "What about the content we already have?",
    answer:
      "We move it across for you. On Helios, the old pages and the remedy spreadsheets were carried into the new site, and Bukinistika’s catalogue updates itself from its original listings.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You choose. We host and maintain it on a server that suits the project and its budget, or we hand everything over to your team. Either way, it’s entirely yours.",
  },
  {
    question: "How do we start, and what does it cost?",
    answer:
      "Send us a few lines about the project and anything you already have: a website, a spreadsheet, a PDF. After a short call, we send a written proposal with the scope, timeline and price. The price depends on the scope, and work starts only once you’ve agreed to it.",
  },
] as const;
