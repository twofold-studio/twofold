/**
 * Interface text, grouped by where it appears. English is British English;
 * Bulgarian addresses the reader with the polite plural in lower case.
 */
export const en = {
  // Page titles and descriptions
  metaTitle: "Software studio in Sofia, Bulgaria",
  workIndexTitle: "Our work",
  workIndexDescription:
    "Six projects by Twofold: an online bookshop in three languages, a pharmacy catalogue, a property sales demo and three products of our own.",

  // Header, menu and other controls
  skip: "Skip to main content",
  mainNavigation: "Main navigation",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  language: "Language",
  lightTheme: "Switch to light theme",
  darkTheme: "Switch to dark theme",
  services: "Services",
  work: "Work",
  team: "Team",
  results: "How we work",
  questions: "Questions",
  contact: "Contact",
  contactUs: "Contact us",

  // Hero
  heroStudio: "Software studio · Sofia, Bulgaria",
  heroOne: "We build your next",
  heroWebsite: "website.",
  heroShop: "online shop.",
  heroPortal: "customer portal.",
  heroPhoneApp: "phone app.",
  heroDashboard: "team dashboard.",
  heroAccessible:
    "We build your next website, online shop, customer portal, phone app or team dashboard.",
  heroCopy:
    "We handle the whole project, from the first idea to support after launch.",
  heroPrimary: "Tell us about your project",
  heroSecondary: "See our work",

  // Services
  servicesHeading: "What we build",
  websitesShops: "Websites & online shops",
  websitesShopsCopy:
    "Sites and shops your own staff can update, in every language you sell in.",
  appsIntegrations: "Web apps & integrations",
  appsIntegrationsCopy:
    "Tools for your team and customers, so nobody types the same data twice.",
  mobileDesktopApps: "Mobile & desktop apps",
  mobileDesktopAppsCopy:
    "Apps for phones and computers, for when a browser isn’t enough.",
  upkeep: "Hosting & maintenance",
  supportShort:
    "We host and look after what we build, or hand it over to your team.",

  // Work: home page list, Work index and case studies
  workHeading: "Selected work",
  readCase: "View case study",
  allProjects: "All work",
  workIndexHeading: "What we’ve built",
  workIndexCopy:
    "For each project you’ll see the problem, what we built and the part that was hardest to get right.",
  backHome: "Back to home",
  projectSummary: "Project summary",
  includes: "Features",
  year: "Year",
  challenge: "The problem",
  solution: "What we built",
  result: "The hard part",
  projectScreenshots: "Screenshots",
  nextProject: "Next project",

  // Team
  aboutBefore: "Two founders.",
  aboutEmphasis: "No one in between.",
  aboutCopy:
    "You speak with the people writing the code, from the first call to launch. Clear decisions, direct feedback, no handoffs between departments.",
  portrait: "Portrait of",
  background: "Credentials and awards",

  // Process
  processBefore: "You see it working",
  processEmphasis: "long before launch.",
  processIdeaTitle: "First conversation",
  processIdeaCopy:
    "We learn how your business works, who will use the product and what it has to do.",
  processTryTitle: "Written proposal",
  processTryCopy:
    "One document with the price, the deadline and everything that’s included. We start once you say yes.",
  processRefineTitle: "Development and review",
  processRefineCopy:
    "You try working versions as we go, not one big reveal at the end.",
  processLaunchTitle: "Testing and launch",
  processLaunchCopy:
    "We check the main tasks, loading speed and layouts on phones and desktops before going live.",
  processHandoverTitle: "Maintenance or handover",
  processHandoverCopy:
    "We keep it running, or hand the code and all access to your team.",

  // FAQ
  faqBefore: "Common",
  faqEmphasis: "questions",

  // Contact
  footerIntro: "Tell us about your project",
  footerLocation:
    "Based in Sofia, working in English and Bulgarian. Your message goes straight to the founders, and we usually get back to you within one working day to arrange a short call.",
  preferEmail: "Or email us",
  emailSubject: "Project enquiry",
  formName: "Name",
  formEmail: "Email",
  formCompany: "Company (optional)",
  formMessage: "About the project",
  formMessageHint:
    "Tell us what it should do and who it’s for. If you already have a website, a spreadsheet or a deadline, mention that too.",
  formSubmit: "Send enquiry",
  formSending: "Sending…",
  formSent: "Thank you, we’ve received your enquiry. We usually get back to you within one working day to arrange a short call.",
  formInvalid:
    "Please add your name, a valid email address and a short message.",
  formFallback:
    "We’ve tried to open your email app with the message filled in. If it didn’t open, copy your message and send it to",
  formError: "We couldn’t send your enquiry. Please email us at",
  formPrivacy: "We use your details only to reply. To have them deleted, email",

  // Footer
  navigation: "Navigation",
  footerCredit: "Designed and built by Twofold.",
};
export type Dictionary = { [K in keyof typeof en]: string };
export const bg: Dictionary = {
  // Page titles and descriptions
  metaTitle: "софтуерно студио в София",
  workIndexTitle: "Проекти",
  workIndexDescription:
    "Шест проекта на Twofold: онлайн книжарница на три езика, каталог на аптека, демо сайт за продажба на жилища и три собствени продукта.",

  // Header, menu and other controls
  skip: "Към основното съдържание",
  mainNavigation: "Основна навигация",
  openMenu: "Отворете менюто",
  closeMenu: "Затворете менюто",
  language: "Език",
  lightTheme: "Превключете към светла тема",
  darkTheme: "Превключете към тъмна тема",
  services: "Услуги",
  work: "Проекти",
  team: "Екип",
  results: "Как работим",
  questions: "Въпроси",
  contact: "Контакти",
  contactUs: "Пишете ни",

  // Hero
  heroStudio: "Софтуерно студио · София, България",
  heroOne: "Изработваме",
  heroWebsite: "сайтове.",
  heroShop: "онлайн магазини.",
  heroPortal: "клиентски портали.",
  heroPhoneApp: "мобилни приложения.",
  heroDashboard: "табла за управление.",
  heroAccessible:
    "Изработваме сайтове, онлайн магазини, клиентски портали, мобилни приложения и табла за управление.",
  heroCopy: "Поемаме целия проект, от идеята до поддръжката след пускането.",
  heroPrimary: "Разкажете ни за проекта си",
  heroSecondary: "Вижте проектите ни",

  // Services
  servicesHeading: "Какво правим",
  websitesShops: "Сайтове и онлайн магазини",
  websitesShopsCopy:
    "Сайтове и магазини, които екипът ви обновява сам, на езиците на клиентите ви.",
  appsIntegrations: "Уеб приложения и интеграции",
  appsIntegrationsCopy:
    "Инструменти за екипа и клиентите ви, за да не въвежда никой едни и същи данни два пъти.",
  mobileDesktopApps: "Мобилни и настолни приложения",
  mobileDesktopAppsCopy:
    "Приложения за телефон и компютър, когато браузърът не е достатъчен.",
  upkeep: "Хостинг и поддръжка",
  supportShort:
    "Поддържаме проекта онлайн и актуален или го предаваме на екипа ви.",

  // Work: home page list, Work index and case studies
  workHeading: "Избрани проекти",
  readCase: "Разгледайте проекта",
  allProjects: "Всички проекти",
  workIndexHeading: "Какво сме изработили",
  workIndexCopy:
    "За всеки проект ще видите проблема, какво изработихме и коя част беше най-трудна.",
  backHome: "Към началната страница",
  projectSummary: "За проекта",
  includes: "Функции",
  year: "Година",
  challenge: "Проблемът",
  solution: "Какво направихме",
  result: "Трудната част",
  projectScreenshots: "Екранни снимки",
  nextProject: "Следващ проект",

  // Team
  aboutBefore: "Двама основатели.",
  aboutEmphasis: "Без посредници.",
  aboutCopy:
    "Разговаряте с хората, които пишат кода, от първия разговор до пускането. Ясни решения и пряка обратна връзка на всеки етап.",
  portrait: "Портрет на",
  background: "Образование и награди",

  // Process
  processBefore: "Виждате проекта в действие",
  processEmphasis: "много преди пускането.",
  processIdeaTitle: "Първи разговор",
  processIdeaCopy:
    "Разбираме как работи бизнесът ви, кой ще използва продукта и какво трябва да прави той.",
  processTryTitle: "Писмено предложение",
  processTryCopy:
    "Един документ с цената, срока и всичко, което е включено. Започваме, когато кажете „да“.",
  processRefineTitle: "Разработка и преглед",
  processRefineCopy:
    "Пробвате работещи версии още по време на разработката, а не всичко наведнъж накрая.",
  processLaunchTitle: "Тестване и пускане",
  processLaunchCopy:
    "Преди пускането проверяваме основните действия, скоростта и изгледа на телефон и компютър.",
  processHandoverTitle: "Поддръжка или предаване",
  processHandoverCopy:
    "Поддържаме проекта или предаваме кода и всички достъпи на екипа ви.",

  // FAQ
  faqBefore: "Често задавани",
  faqEmphasis: "въпроси",

  // Contact
  footerIntro: "Разкажете ни за проекта си",
  footerLocation:
    "В София сме и работим на български и английски. Съобщението ви стига директно до основателите и обикновено ви отговаряме до един работен ден, за да уговорим кратък разговор.",
  preferEmail: "Или ни пишете на",
  emailSubject: "Запитване за проект",
  formName: "Име",
  formEmail: "Имейл",
  formCompany: "Фирма (по желание)",
  formMessage: "За проекта",
  formMessageHint:
    "Разкажете накратко какво ви е нужно и кой ще го използва. Ако вече имате сайт, таблица или краен срок, споменете и тях.",
  formSubmit: "Изпратете запитване",
  formSending: "Изпращане…",
  formSent: "Благодарим! Получихме запитването и обикновено ви отговаряме до един работен ден, за да уговорим кратък разговор.",
  formInvalid: "Моля, попълнете име, валиден имейл и кратко съобщение.",
  formFallback:
    "Опитахме да отворим имейл програмата ви с попълнено съобщение. Ако не се е отворила, копирайте текста и го изпратете на",
  formError: "Не успяхме да изпратим запитването. Моля, пишете ни на",
  formPrivacy:
    "Използваме данните ви само за да ви отговорим. Ако искате да ги изтрием, пишете на",

  // Footer
  navigation: "Навигация",
  footerCredit: "Дизайн и разработка: Twofold.",
};
