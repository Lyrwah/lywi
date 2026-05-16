import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { projects } from "@/lib/projects";
import { useI18n, useTag } from "@/lib/i18n";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileHome } from "@/components/MobileHome";
import { FadeUp } from "@/components/FadeUp";

export const Route = createFileRoute("/")({
  component: Index,
});

function Nav() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="w-full px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-3xl tracking-tight leading-none">
          lywi
        </Link>
        <nav className="flex items-center gap-6 md:gap-8 text-sm">
          <Link to="/work" className="hover:text-[var(--cobalt)] transition-colors">{t.nav.work}</Link>
          <Link to="/services" className="hover:text-[var(--cobalt)] transition-colors">{t.nav.services}</Link>
          <Link to="/contact" className="hover:text-[var(--cobalt)] transition-colors">{t.nav.contact}</Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(closest-side, var(--marigold), transparent)" }} />
      <div aria-hidden className="absolute -bottom-40 -left-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(closest-side, var(--cobalt), transparent)" }} />

      <div className="relative w-full px-6 md:px-12 lg:px-20 pt-16 pb-20 md:pt-24 md:pb-24 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <FadeUp>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--mint)" }} />
              {t.home.badge}
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="mt-6 font-serif text-[14vw] md:text-[9rem] leading-[0.95] tracking-tight">
              {t.home.h1a}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--marigold), var(--coral), var(--plum))",
                }}
              >
                {t.home.h1b}
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">{t.home.lede}</p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/services"
                className="rounded-full px-6 py-3 text-sm font-semibold text-[oklch(0.18_0.04_280)] transition-transform hover:scale-[1.03] shadow-lg"
                style={{
                  backgroundImage: "linear-gradient(135deg, var(--marigold), var(--coral))",
                }}>
                {t.home.ctaStart}
              </Link>
              <Link to="/work"
                className="rounded-full border border-foreground/15 bg-card/60 backdrop-blur px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors">
                {t.home.ctaSeeWork}
              </Link>
            </div>
          </FadeUp>
        </div>

        <aside className="lg:col-span-4 grid grid-cols-2 gap-4">
          {[
            { k: `${projects.length}`, v: t.home.statsShipped, c: "var(--coral)" },
            { k: "2", v: t.home.statsPeople, c: "var(--cobalt)" },
            { k: "3w", v: t.home.statsAvg, c: "var(--mint)" },
            { k: "48h", v: t.home.statsReply, c: "var(--marigold)" },
          ].map((s) => (
            <div key={s.v} className="rounded-3xl border border-border bg-card/70 backdrop-blur p-5">
              <div className="h-2 w-8 rounded-full mb-4" style={{ background: s.c }} />
              <div className="font-serif text-4xl">{s.k}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

function isExternal(url: string) {
  return /^https?:\/\//.test(url);
}

function Work() {
  const { t } = useI18n();
  const tag = useTag();

  return (
    <section id="work" className="border-t border-border py-20 md:py-24">
      <div className="w-full px-6 md:px-12 lg:px-20 flex items-end justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{t.home.workEyebrow}</p>
          <h2 className="mt-2 font-serif text-5xl md:text-6xl tracking-tight">{t.home.workH2}</h2>
        </div>
        <Link to="/work" className="hidden md:inline text-sm hover:text-[var(--cobalt)] transition-colors">
          {t.home.allWork}
        </Link>
      </div>

      {/* Native horizontal scroll — works with touch (phones), trackpads
          (two-finger swipe) and a visible scrollbar on desktop. */}
      <div
        className="lywi-work-scroll mt-10 flex gap-6 overflow-x-auto overflow-y-hidden pb-6"
        style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain" }}
      >
        {projects.map((p, i) => (
          <FadeUp
            key={p.title}
            delay={Math.min(i * 0.06, 0.3)}
            className="shrink-0"
          >
            <a
              href={p.url}
              {...(isExternal(p.url) ? { target: "_blank", rel: "noreferrer" } : {})}
              className="group block w-[78vw] md:w-[460px] aspect-[4/5] rounded-2xl p-7 flex flex-col justify-between transition-transform hover:-translate-y-1"
              style={{ backgroundColor: p.bg, color: p.fg }}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-wider opacity-80">
                <span>{tag(p.tag)}</span>
                <span>{p.year}</span>
              </div>
              <div>
                <h3 className="font-serif text-4xl md:text-5xl leading-tight">{p.title}</h3>
                <div className="mt-4 inline-flex items-center gap-2 text-sm opacity-90">
                  {t.home.viewCase}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </a>
          </FadeUp>
        ))}
      </div>

      <div className="w-full px-6 md:px-12 lg:px-20 mt-2 flex items-center justify-end text-xs text-muted-foreground">
        <Link to="/work" className="md:hidden hover:text-[var(--cobalt)]">{t.home.allWork}</Link>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const colors = ["var(--coral)", "var(--marigold)", "var(--mint)", "var(--cobalt)", "var(--plum)"];
  return (
    <section className="border-t border-border py-20 md:py-24">
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="text-sm text-muted-foreground">{t.home.processEyebrow}</p>
            <h2 className="mt-2 font-serif text-5xl md:text-6xl tracking-tight">{t.home.processH2}</h2>
          </div>
          <p className="max-w-md text-muted-foreground">{t.home.processLede}</p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {t.steps.map((s, i) => (
            <FadeUp key={s.t} delay={Math.min(i * 0.06, 0.3)}>
              <motion.li
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="rounded-2xl border border-border p-6 bg-card hover:shadow-lg transition-shadow h-full list-none"
              >
                <div className="font-serif text-5xl" style={{ color: colors[i] }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-6 font-serif text-2xl">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </motion.li>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Services() {
  const { t } = useI18n();
  const colors = ["var(--marigold)", "var(--coral)", "var(--mint)"];
  return (
    <section id="services" className="border-t border-border py-20 md:py-24">
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="text-sm text-muted-foreground">{t.home.servicesEyebrow}</p>
            <h2 className="mt-2 font-serif text-5xl md:text-6xl tracking-tight">{t.home.servicesH2}</h2>
          </div>
          <Link to="/services" className="text-sm hover:text-[var(--cobalt)]">{t.home.seePricing}</Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.homeServices.map((it, i) => (
            <Link
              key={it.t}
              to="/services"
              className="rounded-2xl border border-border p-8 bg-card hover:shadow-lg transition-shadow block"
            >
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: colors[i] }} />
              <h3 className="mt-6 font-serif text-3xl">{it.t}</h3>
              <p className="mt-3 text-muted-foreground">{it.d}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useI18n();
  return (
    <section
      id="contact"
      className="border-t border-border py-24 md:py-32"
      style={{ background: "linear-gradient(135deg, var(--cobalt), var(--plum))" }}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 text-[oklch(0.97_0.03_85)]">
        <p className="text-sm opacity-80">{t.home.contactEyebrow}</p>
        <Link
          to="/contact"
          className="mt-4 inline-block font-serif text-5xl md:text-7xl tracking-tight hover:opacity-80 transition-opacity"
        >
          {t.home.contactCta}
        </Link>

        <div className="mt-16 grid gap-10 md:grid-cols-3 text-sm">
          <div>
            <p className="opacity-70">{t.home.studio}</p>
            <p className="mt-2">{t.home.studioP1}</p>
            <p>{t.home.studioP2}</p>
          </div>
          <div>
            <p className="opacity-70">{t.home.navigate}</p>
            <div className="mt-2 flex flex-col gap-1">
              <Link to="/work" className="hover:opacity-80">{t.nav.work}</Link>
              <Link to="/services" className="hover:opacity-80">{t.nav.services}</Link>
              <Link to="/contact" className="hover:opacity-80">{t.nav.contact}</Link>
            </div>
          </div>
          <div className="md:text-right opacity-70">© 2026 lywi</div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const isMobile = useIsMobile();
  if (isMobile) return <MobileHome />;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Work />
        <Process />
        <Services />
        <Contact />
      </main>
    </div>
  );
}
