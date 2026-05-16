// =============================================================================
// PROJECTS — placeholder list shown on the homepage carousel and the /work page.
// =============================================================================
//
// ⬇️ EDIT ME — Replace these placeholders with your real projects.
//
// For EACH project you can change:
//   • tag       → the small label (e.g. "E-commerce", "Brand", "Editorial").
//                 Polish translations live in src/lib/i18n.tsx (TAGS_PL).
//   • title     → the project name shown big on the card.
//   • year      → the year the project shipped.
//   • bg        → the card background. Use one of the brand colors:
//                   var(--coral), var(--cobalt), var(--mint),
//                   var(--marigold), var(--plum)
//                 OR a custom CSS color, OR an image — see "USING AN IMAGE" below.
//   • fg        → the text color on the card. Use LIGHT_FG on dark backgrounds
//                 and DARK_FG on light backgrounds for readable contrast.
//   • url       → the link the card opens. Either:
//                   - an internal placeholder like "/projects/aurora-atelier"
//                   - an external link like "https://your-real-case-study.com"
//                     (external links open in a new tab automatically).
//
// USING AN IMAGE INSTEAD OF A SOLID COLOR:
//   1. Drop the image in src/assets/ (e.g. src/assets/aurora.jpg).
//   2. At the top of this file add:  import auroraImg from "@/assets/aurora.jpg";
//   3. Set the bg to:
//        bg: `url(${auroraImg}) center/cover no-repeat`,
//
// IT'S OK TO HAVE FEWER PROJECTS!
//   The homepage carousel and /work page automatically adapt to however many
//   entries are in this list — you can have 1, 2, 3 or 20 projects.
//
// =============================================================================

export type Project = {
  tag: string;
  title: string;
  year: string;
  bg: string;
  fg: string;
  url: string;
};

// Use these for readable text on light/dark cards.
const LIGHT_FG = "oklch(0.18 0.04 280)"; // dark text — use on light/bright backgrounds
const DARK_FG = "oklch(0.97 0.03 85)";   // light text — use on dark/saturated backgrounds

export const projects: Project[] = [
  // ⬇️ EDIT ME — replace with your real projects (delete the ones you don't need).
  // `tag` should be one of the two services we offer: "Homepage" or "Brand website".
  { tag: "Brand website", title: "Aurora Atelier",     year: "2025", bg: "var(--coral)",    fg: LIGHT_FG, url: "/projects/aurora-atelier" },
  { tag: "Brand website", title: "Northwind Journal",  year: "2024", bg: "var(--cobalt)",   fg: DARK_FG,  url: "/projects/northwind-journal" },
  { tag: "Homepage",      title: "Monolith Architects",year: "2024", bg: "var(--mint)",     fg: LIGHT_FG, url: "/projects/monolith-architects" },
  { tag: "Brand website", title: "Soleil & Co.",       year: "2023", bg: "var(--marigold)", fg: LIGHT_FG, url: "/projects/soleil" },
  { tag: "Homepage",      title: "Plum House Press",   year: "2023", bg: "var(--plum)",     fg: DARK_FG,  url: "/projects/plum-house" },
  { tag: "Brand website", title: "Maison Verde",       year: "2023", bg: "var(--mint)",     fg: LIGHT_FG, url: "/projects/maison-verde" },
  { tag: "Homepage",      title: "Halcyon Studio",     year: "2022", bg: "var(--coral)",    fg: LIGHT_FG, url: "/projects/halcyon" },
  { tag: "Brand website", title: "Field & Form",       year: "2022", bg: "var(--cobalt)",   fg: DARK_FG,  url: "/projects/field-and-form" },
  { tag: "Homepage",      title: "Lowtide Records",    year: "2022", bg: "var(--plum)",     fg: DARK_FG,  url: "/projects/lowtide" },
  { tag: "Homepage",      title: "Saffron Kitchen",    year: "2021", bg: "var(--marigold)", fg: LIGHT_FG, url: "/projects/saffron" },
];
