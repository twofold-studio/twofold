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
  shareDescription:
    "Websites and software built around your business. Founder-led, in Sofia.",
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
    kicker: "All your Minecraft servers in one place",
    summary:
      "A web panel for people who host Minecraft servers on their own computer. It sets up each server, shows its console live and keeps backups.",
    kind: "Our own product · in development",
    seoTitle: "Chunkyard — self-hosted Minecraft server management",
    own: true,
    challenge:
      "Running several Minecraft servers on one computer usually means a separate window for each, settings files edited by hand, and backups made whenever someone remembers.",
    solution:
      "You pick a server type or a CurseForge modpack, and Chunkyard downloads it and chooses the right version of Java. From then on, each server has its own page with a live console, resource charts and a history of every settings change.",
    result:
      "Knowing when a server is really ready. A server that has started isn’t always one players can join, so Chunkyard marks it as ready only when Minecraft answers the same check the game uses for its server list.",
    story: [
      "Chunkyard manages Minecraft Java Edition servers on your own hardware. It supports Vanilla, Paper, Purpur, Fabric, Forge, NeoForge and supported CurseForge packs.",
      "The dashboard shows when Minecraft is ready for players, streams console output and keeps a history of server.properties edits. Owner API keys also give scripts and MCP clients access to server controls.",
    ],
    features: [
      "Live console and charts",
      "Backups on your computer or in the cloud",
      "Control from scripts and AI tools",
    ],
    year: "2026",
    link: {
      label: "View Chunkyard on GitHub",
      href: "https://github.com/twofold-studio/chunkyard",
    },
    cover: "/work/chunkyard/console.webp",
    images: [
      {
        src: "/work/chunkyard/hero.webp",
        caption:
          "The list of servers, with live resource readings for Vanilla Survival.",
      },
      {
        src: "/work/chunkyard/console.webp",
        caption: "A Paper server’s console as it starts up.",
      },
    ],
  },
  {
    slug: "oxevu",
    name: "Oxevu",
    kicker: "A home for your films and series",
    summary:
      "Oxevu turns the film and series folders on a home server into a library you can search. The player runs in the browser and remembers where you stopped.",
    kind: "Our own product · in development",
    seoTitle: "Oxevu — a self-hosted media library and player",
    own: true,
    challenge:
      "Films and series on a home server are just folders of files. There’s no artwork, no search and no way to tell what you’ve already watched.",
    solution:
      "Point Oxevu at your folders and it builds a library with artwork, search and filters. You press play in the browser, with subtitles and saved progress, or start a watch party with friends.",
    result:
      "Leaving your files alone. Oxevu only reads your folders, so nothing is renamed or moved. When a device can’t play a file, the player converts it on the fly instead of changing the original.",
    story: [
      "Oxevu is a self-hosted media library and player in active development. A Rust server scans your media folders without changing the files, and a Svelte web interface lets you browse the catalogue and play what you find.",
      "The web player saves progress and supports original-file playback, FFmpeg transcoding and watch parties.",
    ],
    features: [
      "Never changes your files",
      "Picks up where you stopped",
      "Watch parties",
    ],
    year: "2026",
    link: {
      label: "View Oxevu on GitHub",
      href: "https://github.com/twofold-studio/oxevu",
    },
    cover: "/work/oxevu/discover.webp",
    images: [
      {
        src: "/work/oxevu/hero.webp",
        caption: "The film library, with the page for Arcane open in front.",
      },
      {
        src: "/work/oxevu/discover.webp",
        caption: "The Discover page, with filters for year, genre, rating and language.",
      },
      {
        src: "/work/oxevu/seasons.webp",
        caption: "Arcane’s season artwork and episode counts.",
      },
      {
        src: "/work/oxevu/mobile.webp",
        caption:
          "Films, series and the Arcane page on a phone.",
      },
    ],
  },
  {
    slug: "bukinistika",
    name: "Bukinistika",
    kicker: "Old books, and every copy is different",
    summary:
      "An online shop for more than 5,000 rare and second-hand books. It runs in Bulgarian, English and Russian and ships to buyers in Bulgaria and abroad.",
    kind: "Antiquarian bookseller · online shop",
    seoTitle: "Bukinistika — an online shop for rare books in three languages",
    challenge:
      "Thousands of old books, and every one is a single copy with its own condition, photos and price. Some buyers are in Bulgaria, others abroad.",
    solution:
      "A shop where buyers narrow the books down by condition, language, publisher or year, or head straight to the Rare Archive, a darker section for the rarest ones. Once they’ve found a book, a simple checkout walks them through each step.",
    result:
      "Putting more than 5,000 books online without typing a single one by hand. We gathered every book, with its photos, condition and price, into simple files and loaded them all at once. Since then, the owner adds and edits books right in the shop.",
    story: [
      "Bukinistika sells antique and rare books. The shop runs in Bulgarian, English and Russian, and antiquarian copies have their own darker section, the Rare Archive.",
      "The catalogue of over 5,000 copies was loaded in one go from simple files, with each book’s photos, condition and price. Checkout begins by asking whether the books stay in Bulgaria or go abroad, and the owner can find any copy by condition, language, publisher or category.",
    ],
    features: [
      "Bulgarian, English and Russian",
      "No books typed in by hand",
      "Econt, Speedy and cash on delivery",
    ],
    year: "2026",
    link: { label: "Visit bukinistika.com", href: "https://bukinistika.com" },
    cover: "/work/bukinistika/hero.webp",
    images: [
      {
        src: "/work/bukinistika/hero.webp",
        caption:
          "The catalogue in Bulgarian, with a 1947 Taso Primo first edition open in front.",
      },
      {
        src: "/work/bukinistika/rare-archive.webp",
        caption:
          "The Rare Archive, a darker section just for antiquarian copies.",
      },
      {
        src: "/work/bukinistika/checkout.webp",
        caption:
          "Checkout starts by asking where the books are going.",
      },
      {
        src: "/work/bukinistika/admin.webp",
        caption:
          "The owner’s view of the catalogue, with filters and a switch that shows only rare editions.",
      },
    ],
  },
  {
    slug: "arkada",
    name: "Arkada",
    kicker: "Choose a home straight from the building",
    summary:
      "A sales website for companies building new apartment blocks. Buyers click through the building to the exact apartment and see its price, plan and the size of every room.",
    kind: "New-build apartment sales · demo",
    seoTitle: "Arkada — a 3D sales site for new-build apartments",
    challenge:
      "Buyers of new-build apartments in Sofia usually get a PDF price list and a phone number.",
    solution:
      "Buyers start at the front of the building, pick a floor and see which apartments are still free, on a plan or in 3D. They compare a few, then send a question or ask for a viewing. The sales team updates prices and availability themselves.",
    result:
      "Making nine completely different website designs share one set of apartments and prices. A Versions button switches any page to another design, so a developer can compare real pages before choosing one. The apartments are entered once and work in every design.",
    story: [
      "Buyers of new-build apartments in Sofia usually get a PDF price list and a phone number. Arkada shows the same offer as a site: pick a building from its facade, a floor from the plan or a 3D model, and an apartment with its price and room areas, then compare and send an enquiry.",
      "Because it is a sales demo, it comes in nine different designs with the same content behind them. A “Versions” button on every page shows that page in another design, so a developer can choose a look by clicking through real pages instead of mockups. The sales team can update apartments, prices and availability themselves at any time.",
    ],
    features: [
      "3D building model",
      "Nine complete website designs",
      "Bulgarian and English",
    ],
    year: "2026",
    link: { label: "Open the demo", href: "https://arkadia.fractal-tess.xyz" },
    cover: "/work/arkada/hero.webp",
    images: [
      {
        src: "/work/arkada/hero.webp",
        caption:
          "Two of the nine designs, with the 3D version of Lipa Park in front showing the apartments left on each floor.",
      },
      {
        src: "/work/arkada/apartment.webp",
        caption:
          "Apartment A401, opened from the building model: its rooms in 3D, the floor plan, the price and every room’s area.",
      },
      {
        src: "/work/arkada/project.webp",
        caption:
          "Lipa Park, with the homes still available, the price range and the floor chooser.",
      },
      {
        src: "/work/arkada/phones.webp",
        caption:
          "The home page, the 3D building model and a project page on three phones.",
      },
    ],
  },
  {
    slug: "helios",
    name: "Helios",
    kicker: "From spreadsheet to searchable catalogue",
    summary:
      "More than 3,600 homeopathic remedies in one place online. Customers and homeopaths find what they need and send the pharmacy a single request.",
    kind: "Pharmacy in Sofia · new website",
    seoTitle: "Helios — a searchable catalogue for a homeopathic pharmacy",
    challenge:
      "The pharmacy’s website dated from 2012. To find a remedy, customers had to download a spreadsheet and look through it themselves.",
    solution:
      "A new site where customers search the catalogue, open a remedy and see its forms and prices. They add remedies, kits and books to one list and send it to the pharmacy by email. The staff update products, prices and opening hours themselves.",
    result:
      "Making 3,600 remedies, each in several potencies and forms, easy to find. The names are long and in Latin, so customers can also search by abbreviation, potency or just the first letter.",
    story: [
      "Helios Homeopharm is a homeopathic pharmacy in Sofia whose website dated from 2012. Its catalogue of over 3,600 remedies was only available as a spreadsheet you downloaded.",
      "The new site is fast and fully in Bulgarian. The whole catalogue can be searched by name, abbreviation, potency or first letter, and each remedy shows its forms with their prices. Customers put remedies, kits and books into one request and send it to the pharmacy. The staff can update products, prices and opening hours themselves, whenever they need to, and everything from the old site and the spreadsheets has been carried over.",
    ],
    features: ["Search by name or first letter", "Request several items at once", "Staff update it themselves"],
    year: "2026",
    link: {
      label: "View the new site",
      href: "https://helios.fractal-tess.xyz",
    },
    cover: "/work/helios/hero.webp",
    images: [
      {
        src: "/work/helios/hero.webp",
        caption:
          "The home page and, in front of it, the catalogue with Arnica montana open to show its forms and prices.",
      },
      {
        src: "/work/helios/bento.webp",
        caption:
          "The home page sections: the catalogue, forms and prices, kits and Bach drops.",
      },
      {
        src: "/work/helios/request.webp",
        caption:
          "A request with the chosen items, their quantities and an estimated total, next to the contact form.",
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
      "Chapters of web novels, read aloud for people who’d rather listen. The player follows the text line by line, so you can read along.",
    kind: "Our own product · beta",
    seoTitle: "vAIced — web novels turned into audiobooks",
    own: true,
    challenge:
      "Web novels rarely get audiobooks, and ordinary read-aloud apps give every character the same voice.",
    solution:
      "vAIced reads the chapter, works out who says each line and gives every character their own AI voice. As you listen, the player highlights the current line in the speaker’s colour and shows a picture for each scene.",
    result:
      "Working out who is speaking. Prose often doesn’t name the speaker, and every line needs one before it can be voiced. The first finished chapter, from Mother of Learning, has 461 lines across 9 scenes, seven characters and a narrator.",
    story: [
      "vAIced is Twofold’s own product. It reads a chapter of a web novel, works out who says each line, gives every character their own AI voice and turns the chapter into an audiobook you can play in the browser.",
      "The first finished chapter, from Mother of Learning, has 461 lines across 9 scenes, with seven characters and a narrator. The player highlights each line as it is read, colours it by speaker and shows a picture for every scene. The public site, with an early-access list, is live at vaiced.com.",
    ],
    features: [
      "A voice per character",
      "Line-by-line player",
      "Early-access website",
    ],
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
      "Us, the founders. We write the code ourselves, so you always talk to the people building your project. When a project needs design or testing, we have trusted people for that, and we stay your main contact.",
  },
  {
    question: "Can our team update the content ourselves?",
    answer:
      "Yes, if you’d like that. We build an easy-to-use editor around your content, so you can change text, photos, products and prices yourself, without waiting for us.",
  },
  {
    question: "Can you build in Bulgarian and other languages?",
    answer:
      "Yes. We’ve already built a shop that sells in Bulgarian, English and Russian. Adding a new language later is just a matter of translating the text.",
  },
  {
    question: "What about the content we already have?",
    answer:
      "We move it for you, including old pages and the products from your spreadsheets, so you won’t have to type anything in again.",
  },
  {
    question: "What happens after launch?",
    answer:
      "That’s up to you. We can host the site on a server that fits your budget and look after it, or hand the code and every login to your team. Either way, it belongs to you.",
  },
  {
    question: "How do we start, and what does it cost?",
    answer:
      "Write us a few lines about the project and send anything you already have, like an old site, a spreadsheet or a PDF. After a short call, you get a written proposal with the price, the deadline and everything that’s included. The price depends on how much there is to build, and we start once you say yes.",
  },
] as const;
