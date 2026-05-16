import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { projects } from "@/lib/projects";
import { useI18n, useTag } from "@/lib/i18n";

function isExternal(url: string) {
  return /^https?:\/\//.test(url);
}

function MobileNav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="w-full px-5 h-14 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl tracking-tight leading-none">
          lywi
        </Link>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="p-2 -mr-2"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="absolute right-3 top-[calc(100%+8px)] min-w-[180px] flex flex-col gap-1 rounded-2xl border border-border bg-card/95 backdrop-blur-md p-2 text-sm shadow-xl">
          <Link to="/work" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted">{t.nav.work}</Link>
          <Link to="/services" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted">{t.nav.services}</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted">{t.nav.contact}</Link>
        </nav>
      )}
    </header>
  );
}

function MobileHero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="absolute -top-24 -right-20 h-[300px] w-[300px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(closest-side, var(--marigold), transparent)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-20 h-[300px] w-[300px] rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(closest-side, var(--cobalt), transparent)" }}
      />

      <div className="relative w-full px-5 pt-10 pb-12">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--mint)" }} />
          {t.home.badge}
        </div>

        <h1 className="mt-5 font-serif text-[15vw] leading-[0.95] tracking-tight break-words">
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

        <p className="mt-5 text-base text-muted-foreground">{t.home.lede}</p>

        <div className="mt-7 flex flex-col gap-2.5">
          <Link
            to="/services"
            className="rounded-full px-5 py-3 text-sm font-semibold text-center text-[oklch(0.18_0.04_280)] shadow-lg"
            style={{ backgroundImage: "linear-gradient(135deg, var(--marigold), var(--coral))" }}
          >
            {t.home.ctaStart}
          </Link>
          <Link
            to="/work"
            className="rounded-full border border-foreground/15 bg-card/60 px-5 py-3 text-sm font-medium text-center"
          >
            {t.home.ctaSeeWork}
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {[
            { k: `${projects.length}`, v: t.home.statsShipped, c: "var(--coral)" },
            { k: "2", v: t.home.statsPeople, c: "var(--cobalt)" },
            { k: "3w", v: t.home.statsAvg, c: "var(--mint)" },
            { k: "48h", v: t.home.statsReply, c: "var(--marigold)" },
          ].map((s) => (
            <div key={s.v} className="rounded-2xl border border-border bg-card/70 p-3.5">
              <div className="h-1.5 w-6 rounded-full mb-2" style={{ background: s.c }} />
              <div className="font-serif text-2xl">{s.k}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileWork() {
  const { t } = useI18n();
  const tag = useTag();
  return (
    <section className="border-t border-border py-14">
      <div className="w-full px-5 flex items-end justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{t.home.workEyebrow}</p>
          <h2 className="mt-1.5 font-serif text-3xl tracking-tight">{t.home.workH2}</h2>
        </div>
      </div>

      <div
        className="lywi-work-scroll mt-6 flex gap-4 overflow-x-auto overflow-y-hidden pb-4"
        style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain" }}
      >
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.url}
            {...(isExternal(p.url) ? { target: "_blank", rel: "noreferrer" } : {})}
            className="group shrink-0 w-[72vw] aspect-[4/5] rounded-2xl p-5 flex flex-col justify-between"
            style={{ backgroundColor: p.bg, color: p.fg }}
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider opacity-80">
              <span>{tag(p.tag)}</span>
              <span>{p.year}</span>
            </div>
            <div>
              <h3 className="font-serif text-2xl leading-tight">{p.title}</h3>
              <div className="mt-2 inline-flex items-center gap-2 text-xs opacity-90">
                {t.home.viewCase}
                <span>→</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="w-full px-5 mt-2 flex items-center justify-end text-xs text-muted-foreground">
        <Link to="/work" className="hover:text-[var(--cobalt)]">{t.home.allWork}</Link>
      </div>
    </section>
  );
}

function MobileProcess() {
  const { t } = useI18n();
  const colors = ["var(--coral)", "var(--marigold)", "var(--mint)", "var(--cobalt)", "var(--plum)"];
  return (
    <section className="border-t border-border py-14">
      <div className="w-full px-5">
        <p className="text-xs text-muted-foreground">{t.home.processEyebrow}</p>
        <h2 className="mt-1.5 font-serif text-3xl tracking-tight">{t.home.processH2}</h2>
        <p className="mt-3 text-sm text-muted-foreground">{t.home.processLede}</p>

        <ol className="mt-8 grid gap-3">
          {t.steps.map((s, i) => (
            <li key={s.t} className="rounded-2xl border border-border p-5 bg-card">
              <div className="font-serif text-3xl" style={{ color: colors[i] }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-serif text-xl">{s.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MobileServices() {
  const { t } = useI18n();
  const colors = ["var(--marigold)", "var(--coral)", "var(--mint)"];
  return (
    <section className="border-t border-border py-14">
      <div className="w-full px-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">{t.home.servicesEyebrow}</p>
            <h2 className="mt-1.5 font-serif text-3xl tracking-tight">{t.home.servicesH2}</h2>
          </div>
          <Link to="/services" className="text-xs hover:text-[var(--cobalt)] shrink-0">
            {t.home.seePricing}
          </Link>
        </div>

        <div className="mt-7 grid gap-3">
          {t.homeServices.map((it, i) => (
            <Link key={it.t} to="/services" className="rounded-2xl border border-border p-5 bg-card block">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: colors[i] }} />
              <h3 className="mt-3 font-serif text-xl">{it.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileContact() {
  const { t } = useI18n();
  return (
    <section
      className="border-t border-border py-16"
      style={{ background: "linear-gradient(135deg, var(--cobalt), var(--plum))" }}
    >
      <div className="w-full px-5 text-[oklch(0.97_0.03_85)]">
        <p className="text-xs opacity-80">{t.home.contactEyebrow}</p>
        <Link
          to="/contact"
          className="mt-3 inline-block font-serif text-4xl tracking-tight leading-tight"
        >
          {t.home.contactCta}
        </Link>

        <div className="mt-10 grid gap-6 text-sm">
          <div>
            <p className="opacity-70">{t.home.studio}</p>
            <p className="mt-1.5">{t.home.studioP1}</p>
            <p>{t.home.studioP2}</p>
          </div>
          <div>
            <p className="opacity-70">{t.home.navigate}</p>
            <div className="mt-1.5 flex flex-col gap-1">
              <Link to="/work">{t.nav.work}</Link>
              <Link to="/services">{t.nav.services}</Link>
              <Link to="/contact">{t.nav.contact}</Link>
            </div>
          </div>
          <div className="opacity-70 text-xs">© 2026 lywi</div>
        </div>
      </div>
    </section>
  );
}

export function MobileHome() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MobileNav />
      <main>
        <MobileHero />
        <MobileWork />
        <MobileProcess />
        <MobileServices />
        <MobileContact />
      </main>
    </div>
  );
}
