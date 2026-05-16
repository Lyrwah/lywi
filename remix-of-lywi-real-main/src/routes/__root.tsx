import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { I18nProvider, LanguageSwitcher } from "@/lib/i18n";
import { PageTransition } from "@/components/PageTransition";

function NotFoundComponent() {
  // Branded 404 — cream background, cobalt accents, marigold/coral glow.
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(closest-side, var(--marigold), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(closest-side, var(--cobalt), transparent)" }}
      />
      <div className="relative max-w-xl text-center">
        <div className="inline-flex items-center gap-3 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--coral)" }} />
          Lost in the studio
        </div>
        <h1
          className="mt-6 font-serif text-[28vw] md:text-[14rem] leading-[0.9] tracking-tight bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--cobalt), var(--plum), var(--coral))",
          }}
        >
          404
        </h1>
        <h2 className="mt-4 font-serif text-3xl md:text-4xl tracking-tight">
          This page wandered off
        </h2>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-full px-6 py-3 text-sm font-semibold text-[oklch(0.18_0.04_280)] shadow-lg transition-transform hover:scale-[1.03]"
            style={{ backgroundImage: "linear-gradient(135deg, var(--marigold), var(--coral))" }}
          >
            Back home
          </Link>
          <Link
            to="/work"
            className="rounded-full border border-foreground/15 bg-card/60 backdrop-blur px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
          >
            See our work
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "lywi — A two-person studio building quietly remarkable websites" },
      { name: "description", content: "A two-person studio designing and building considered websites for ambitious brands." },
      { name: "author", content: "lywi" },
      { property: "og:title", content: "lywi — A two-person studio building quietly remarkable websites" },
      { property: "og:description", content: "A two-person studio designing and building considered websites for ambitious brands." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "lywi — A two-person studio building quietly remarkable websites" },
      { name: "twitter:description", content: "A two-person studio designing and building considered websites for ambitious brands." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap",
      },
      // Extra display fonts loaded so they show up in the Visual Edits font
      // picker — handy for trying different looks on the "lywi" wordmark.
      // Mix of fancy / display / serif / mono / playful options.
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=DM+Serif+Display&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Libre+Caslon+Display&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Italiana&family=Yeseva+One&family=Abril+Fatface&family=Unna:ital,wght@0,400;0,700;1,400;1,700&family=Tenor+Sans&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Archivo:ital,wght@0,100..900;1,100..900&family=Archivo+Black&family=Bebas+Neue&family=Oswald:wght@200..700&family=Anton&family=Syne:wght@400..800&family=Unbounded:wght@200..900&family=Major+Mono+Display&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Pacifico&family=Permanent+Marker&family=Shrikhand&family=Lobster&family=Righteous&family=Monoton&family=Press+Start+2P&family=VT323&family=Rubik+Mono+One&family=Audiowide&family=Orbitron:wght@400..900&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <PageTransition>
          <Outlet />
        </PageTransition>
        <div className="fixed bottom-4 right-4 z-50">
          <LanguageSwitcher />
        </div>
      </I18nProvider>
    </QueryClientProvider>
  );
}
