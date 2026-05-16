import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — lywi" },
      { name: "description", content: "Site types, what's included and pricing from lywi." },
    ],
  }),
  component: ServicesPage,
});

const colors = ["var(--mint)", "var(--cobalt)", "var(--coral)", "var(--plum)"];
const fgs = [
  "oklch(0.18 0.04 280)",
  "oklch(0.97 0.03 85)",
  "oklch(0.18 0.04 280)",
  "oklch(0.97 0.03 85)",
];

function ServicesPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="w-full px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-3xl tracking-tight leading-none">
            lywi
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-[var(--cobalt)]">{t.nav.back}</Link>
            <Link to="/work" className="hover:text-[var(--cobalt)]">{t.nav.work}</Link>
            <Link to="/contact" className="hover:text-[var(--cobalt)]">{t.nav.contact}</Link>
          </nav>
        </div>
      </header>

      <main className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <p className="text-sm text-muted-foreground">{t.services.eyebrow}</p>
        <h1 className="mt-2 font-serif text-5xl md:text-7xl tracking-tight">
          {t.services.h1}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t.services.lede}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.tiers.map((tier, i) => {
            const fg = fgs[i];
            return (
              <article
                key={tier.name}
                className="rounded-2xl p-8 flex flex-col justify-between"
                style={{ backgroundColor: colors[i], color: fg }}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-serif text-3xl md:text-4xl">{tier.name}</h2>
                    <span className="text-sm opacity-80">{tier.duration}</span>
                  </div>
                  <p className="mt-3 opacity-90">{tier.summary}</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    {tier.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full" style={{ background: fg }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 flex items-center justify-end">
                  <Link
                    to="/contact"
                    className="rounded-full px-5 py-2 text-sm font-medium border"
                    style={{ borderColor: fg, color: fg }}
                  >
                    {t.services.startCta}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-20 rounded-2xl border border-border p-8 md:p-12 bg-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">{t.services.notSureH}</h2>
            <p className="mt-2 text-muted-foreground max-w-md">{t.services.notSureP}</p>
          </div>
          <Link
            to="/contact"
            className="rounded-full px-6 py-3 text-sm font-medium text-primary-foreground"
            style={{ backgroundColor: "var(--cobalt)" }}
          >
            {t.services.getInTouch}
          </Link>
        </section>
      </main>
    </div>
  );
}
