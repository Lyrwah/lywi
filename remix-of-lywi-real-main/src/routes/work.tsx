import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { useI18n, useTag } from "@/lib/i18n";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "All Work — lywi" },
      { name: "description", content: "Every project from lywi." },
      { property: "og:title", content: "All Work — lywi" },
      { property: "og:description", content: "Every project from lywi." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { t } = useI18n();
  const tag = useTag();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="w-full px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-3xl tracking-tight leading-none">
            lywi
          </Link>
          <Link
            to="/"
            className="rounded-full px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: "var(--cobalt)" }}
          >
            {t.nav.back}
          </Link>
        </div>
      </header>

      <main className="w-full px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <p className="text-sm text-muted-foreground">{t.work.eyebrow}</p>
        <h1 className="mt-2 font-serif text-5xl md:text-7xl tracking-tight">
          {t.work.h1}
        </h1>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => {
            const external = /^https?:\/\//.test(p.url);
            return (
              <a
                key={p.title}
                href={p.url}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group block aspect-[4/5] rounded-2xl p-6 transition-transform hover:-translate-y-1"
                style={{ backgroundColor: p.bg, color: p.fg }}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wider opacity-80">
                    <span>{tag(p.tag)}</span>
                    <span>{p.year}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl leading-tight">{p.title}</h3>
                    <div className="mt-3 inline-flex items-center gap-2 text-sm opacity-90">
                      {t.work.visit}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-16">
          <Link
            to="/"
            className="rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
          >
            {t.nav.back}
          </Link>
        </div>
      </main>
    </div>
  );
}
