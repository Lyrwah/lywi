import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "pl";

// ⬇️ EDIT ME — Default language for first-time visitors. Change "pl" to "en"
// if you'd rather show English by default. After a visitor picks a language
// it's saved to their browser and used on subsequent visits.
const DEFAULT_LANG: Lang = "pl";

const en = {
  nav: { work: "Projects", services: "Services", contact: "Contact", back: "← Back to home", allWork: "← All projects" },
  home: {
    badge: "A two-person studio · Always taking new projects",
    h1a: "We build",
    h1b: "websites",
    lede: "Designing and building considered, colorful websites for brands that want to feel — not just function.",
    ctaStart: "Start a project →",
    ctaSeeWork: "See the projects",
    statsShipped: "Brands shipped",
    statsPeople: "People, no middlemen",
    statsAvg: "Avg. project",
    statsReply: "Reply window",
    workEyebrow: "Selected projects",
    workH2: "Recent projects",
    allWork: "All projects →",
    viewCase: "See project",
    dragHint: "",
    processEyebrow: "Process",
    processH2: "How we work",
    processLede: "Five steps, three weeks on average. You talk to the people doing the work — every time.",
    servicesEyebrow: "Services",
    servicesH2: "What we make",
    seePricing: "Learn more →",
    contactEyebrow: "Contact",
    contactCta: "Start a project →",
    studio: "Studio",
    studioP1: "Two people.",
    studioP2: "Working remotely.",
    navigate: "Navigate",
  },
  steps: [
    { t: "Brief", d: "You send us a note via the contact form. We reply within 48 hours." },
    { t: "Scope", d: "A short call to align on goals, timeline and a fixed price." },
    { t: "Design", d: "Two distinct directions, then refinement — never templates." },
    { t: "Build", d: "We build it fast, easy to use and easy for you to update later." },
    { t: "Launch", d: "We ship it together and stay around to iterate after launch." },
  ],
  homeServices: [
    { t: "Homepage", d: "A focused landing page that introduces who you are and what you do." },
    { t: "Brand website", d: "A full marketing site that translates your brand into a real experience." },
  ],
  services: {
    title: "Services — lywi",
    desc: "Site types and what's included from lywi.",
    eyebrow: "Services",
    h1: "What we make",
    lede: "Two ways to work with us. Every project is custom — these are starting points, not templates.",
    notSureH: "Not sure which fits?",
    notSureP: "Tell us about your project and we'll point you at the right starting point — no pressure.",
    getInTouch: "Get in touch →",
    startCta: "Start a project →",
  },
  // ⬇️ EDIT ME — Service tiers shown on /services. Add or remove freely.
  tiers: [
    { name: "Homepage", duration: "1–2 weeks", summary: "A single, focused page to introduce your brand, product or event.", points: ["One long-form page", "Custom design", "Mobile-friendly", "Easy to edit later"] },
    { name: "Brand website", duration: "3–5 weeks", summary: "A full marketing site that translates your brand into a real experience.", points: ["Connected sub pages", "Custom design", "Easy to find online", "Smooth, polished feel"] },
  ],
  work: {
    title: "All Projects — lywi",
    desc: "Every project from lywi.",
    eyebrow: "Archive",
    h1: "All projects",
    visit: "See project",
  },
  contact: {
    title: "Contact — lywi",
    desc: "Tell us about your project and we'll get back within 48 hours.",
    eyebrow: "Contact",
    h1: "Let's talk",
    lede: "Tell us a bit about your project. We answer within 48 hours, on weekdays.",
    emailLabel: "Email · ",
    studioLabel: "Studio · ",
    studio: "Two people, working remotely",
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    siteType: "Type of site",
    description: "Project description",
    descPlaceholder: "What are you trying to build? Who's it for?",
    send: "Send message →",
    sending: "Sending…",
    errorMsg: "Something went wrong. Please try again or email us directly.",
    thanks: "Thanks,",
    friend: "friend",
    gotNoteA: "We've got your note about a",
    gotNoteB: ". We'll be in touch within 48 hours.",
    siteTypes: ["Homepage", "Brand website", "Other"],
  },
  project: {
    placeholder: "Placeholder case-study page. Replace the url in src/lib/projects.ts to point this card at your real project link.",
    fallback: "Project",
  },
  notFound: { h1: "404", h2: "Page not found", p: "The page you're looking for doesn't exist or has been moved.", home: "Go home" },
};

const pl: typeof en = {
  nav: { work: "Projekty", services: "Oferta", contact: "Kontakt", back: "← Wróć na stronę główną", allWork: "← Wszystkie projekty" },
  home: {
    badge: "Dwuosobowe studio · Zawsze przyjmujemy nowe projekty",
    h1a: "Tworzymy",
    h1b: "strony",
    lede: "Projektujemy i budujemy przemyślane, kolorowe strony dla marek, które chcą poruszać — nie tylko działać.",
    ctaStart: "Zacznij projekt →",
    ctaSeeWork: "Zobacz projekty",
    statsShipped: "Zrealizowanych marek",
    statsPeople: "Osoby, bez pośredników",
    statsAvg: "Średni projekt",
    statsReply: "Czas odpowiedzi",
    workEyebrow: "Wybrane projekty",
    workH2: "Ostatnie projekty",
    allWork: "Wszystkie projekty →",
    viewCase: "Zobacz projekt",
    dragHint: "",
    processEyebrow: "Proces",
    processH2: "Jak pracujemy",
    processLede: "Pięć kroków, średnio trzy tygodnie. Rozmawiasz wprost z osobami, które robią robotę — za każdym razem.",
    servicesEyebrow: "Oferta",
    servicesH2: "Co robimy",
    seePricing: "Dowiedz się więcej →",
    contactEyebrow: "Kontakt",
    contactCta: "Zacznij projekt →",
    studio: "Studio",
    studioP1: "Dwie osoby.",
    studioP2: "Pracujemy zdalnie.",
    navigate: "Nawigacja",
  },
  steps: [
    { t: "Zapytanie", d: "Piszesz do nas przez formularz. Odpowiadamy w ciągu 48 godzin." },
    { t: "Zakres", d: "Krótka rozmowa, żeby ustalić cele, harmonogram i stałą cenę." },
    { t: "Projekt", d: "Dwa różne kierunki, potem dopracowanie — żadnych szablonów." },
    { t: "Wykonanie", d: "Budujemy szybko, wygodnie i tak, żebyś mógł łatwo aktualizować." },
    { t: "Start", d: "Wdrażamy razem i zostajemy po starcie, żeby spokojnie iterować." },
  ],
  homeServices: [
    { t: "Strona główna", d: "Skupiona strona, która przedstawia kim jesteście i co robicie." },
    { t: "Strona marki", d: "Pełna strona marki, która przekłada Twoją markę na prawdziwe doświadczenie." },
  ],
  services: {
    title: "Oferta — lywi",
    desc: "Rodzaje stron i zakres prac w lywi.",
    eyebrow: "Oferta",
    h1: "Co robimy",
    lede: "Dwa sposoby współpracy. Każdy projekt jest indywidualny — to punkty wyjścia, nie szablony.",
    notSureH: "Nie wiesz, co wybrać?",
    notSureP: "Opowiedz o swoim projekcie, a podpowiemy odpowiedni punkt startu — bez presji.",
    getInTouch: "Napisz do nas →",
    startCta: "Zacznij projekt →",
  },
  tiers: [
    { name: "Strona główna", duration: "1–2 tygodnie", summary: "Jedna skupiona strona, która przedstawia markę, produkt lub wydarzenie.", points: ["Jedna rozbudowana strona", "Indywidualny projekt", "Działa na telefonie", "Łatwa do późniejszej edycji"] },
    { name: "Strona marki", duration: "3–5 tygodni", summary: "Pełna strona marki, która przekłada Twoją markę na prawdziwe doświadczenie.", points: ["Połączone podstrony", "Indywidualny projekt", "Łatwa do znalezienia w sieci", "Dopracowane animacje"] },
  ],
  work: {
    title: "Wszystkie projekty — lywi",
    desc: "Wszystkie projekty lywi.",
    eyebrow: "Archiwum",
    h1: "Wszystkie projekty",
    visit: "Zobacz projekt",
  },
  contact: {
    title: "Kontakt — lywi",
    desc: "Opowiedz o swoim projekcie, odezwiemy się w ciągu 48 godzin.",
    eyebrow: "Kontakt",
    h1: "Porozmawiajmy",
    lede: "Opowiedz o swoim projekcie. Odpowiadamy w ciągu 48 godzin, w dni robocze.",
    emailLabel: "E-mail · ",
    studioLabel: "Studio · ",
    studio: "Dwie osoby, pracujemy zdalnie",
    name: "Imię",
    email: "E-mail",
    phone: "Telefon (opcjonalnie)",
    siteType: "Rodzaj strony",
    description: "Opis projektu",
    descPlaceholder: "Co chcesz zbudować? Dla kogo?",
    send: "Wyślij wiadomość →",
    sending: "Wysyłanie…",
    errorMsg: "Coś poszło nie tak. Spróbuj ponownie lub napisz do nas bezpośrednio.",
    thanks: "Dzięki,",
    friend: "przyjacielu",
    gotNoteA: "Mamy Twoją wiadomość o projekcie",
    gotNoteB: ". Odezwiemy się w ciągu 48 godzin.",
    siteTypes: ["Strona główna", "Strona marki", "Inne"],
  },
  project: {
    placeholder: "Tu pojawi się strona projektu. Aby ustawić docelowy link tej karty, edytuj plik src/lib/projects.ts.",
    fallback: "Projekt",
  },
  notFound: { h1: "404", h2: "Nie znaleziono strony", p: "Strona, której szukasz, nie istnieje lub została przeniesiona.", home: "Wróć na stronę główną" },
};

const dicts = { en, pl };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: typeof en };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("lang") as Lang)) || null;
    if (saved === "en" || saved === "pl") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", l);
      document.documentElement.lang = l;
    }
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

const TAGS_PL: Record<string, string> = {
  "Homepage": "Strona główna",
  "Brand website": "Strona marki",
};

export function useTag() {
  const { lang } = useI18n();
  return (tag: string) => (lang === "pl" ? TAGS_PL[tag] ?? tag : tag);
}

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const opts: { code: Lang; label: string }[] = [
    { code: "pl", label: "PL" },
    { code: "en", label: "EN" },
  ];
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-card/90 p-1 text-xs shadow-lg backdrop-blur">
      {opts.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => setLang(o.code)}
          aria-pressed={lang === o.code}
          aria-label={o.code === "en" ? "English" : "Polski"}
          className={`cursor-pointer rounded-full px-3.5 py-1.5 font-medium leading-none transition-colors ${
            lang === o.code ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
