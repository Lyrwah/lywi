import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { useI18n, useTag } from "@/lib/i18n";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectPlaceholder,
});

function ProjectPlaceholder() {
  const { t } = useI18n();
  const tag = useTag();
  const { slug } = Route.useParams();
  const project = projects.find((p) => p.url.endsWith(`/${slug}`));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="w-full px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-3xl tracking-tight leading-none">
            lywi
          </Link>
          <Link to="/work" className="text-sm hover:text-[var(--cobalt)]">{t.nav.allWork}</Link>
        </div>
      </header>

      <main className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <p className="text-sm text-muted-foreground">{project ? tag(project.tag) : t.project.fallback} · {project?.year ?? ""}</p>
        <h1 className="mt-2 font-serif text-5xl md:text-7xl tracking-tight">
          {project?.title ?? slug}
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground">{t.project.placeholder}</p>

        <div className="mt-12">
          <Link
            to="/"
            className="rounded-full px-6 py-3 text-sm font-medium text-primary-foreground"
            style={{ backgroundColor: "var(--cobalt)" }}
          >
            {t.nav.back}
          </Link>
        </div>
      </main>
    </div>
  );
}
