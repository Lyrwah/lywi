import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

// =============================================================================
// CONTACT FORM EMAIL DELIVERY
// =============================================================================
//
// ⬇️ EDIT ME — change the email address below to receive form submissions.
//
// HOW IT WORKS:
//   This form posts to FormSubmit (https://formsubmit.co), a free service that
//   forwards form data to the email address in the URL. No signup required.
//
// FIRST-TIME SETUP (do this once):
//   1. Put your real email in CONTACT_EMAIL below.
//   2. Submit the form ONCE from the live site. FormSubmit will email you a
//      one-click confirmation link — open it. After that all future submissions
//      arrive in your inbox automatically.
//
// WANT A DIFFERENT PROVIDER?
//   Swap CONTACT_ENDPOINT for any service that accepts a JSON POST
//   (e.g. Web3Forms, Formspree, your own API). The form payload is JSON with:
//     { name, email, phone, siteType, description, _subject }
//
const CONTACT_EMAIL = "hello@lywi.studio"; // ← CHANGE THIS to your real address
const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`;
// =============================================================================

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — lywi" },
      { name: "description", content: "Tell us about your project and we'll get back within 48 hours." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  const SITE_TYPES = t.contact.siteTypes;
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", siteType: SITE_TYPES[0], description: "" });

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          _subject: `New project enquiry — ${form.siteType}`,
        }),
      });
      if (!res.ok) throw new Error(`Failed (${res.status})`);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(t.contact.errorMsg);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="w-full px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-3xl tracking-tight leading-none">
            lywi
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/work" className="hover:text-[var(--cobalt)]">{t.nav.work}</Link>
            <Link to="/services" className="hover:text-[var(--cobalt)]">{t.nav.services}</Link>
          </nav>
        </div>
      </header>

      <main className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="text-sm text-muted-foreground">{t.contact.eyebrow}</p>
          <h1 className="mt-2 font-serif text-5xl md:text-7xl tracking-tight">
            {t.contact.h1}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-md">{t.contact.lede}</p>
          <div className="mt-10 space-y-3 text-sm">
            <p>
              <span className="opacity-60">{t.contact.emailLabel}</span>
              <a className="hover:text-[var(--cobalt)]" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
            <p><span className="opacity-60">{t.contact.studioLabel}</span>{t.contact.studio}</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div
              className="rounded-2xl p-10"
              style={{ background: "linear-gradient(135deg, var(--cobalt), var(--plum))", color: "oklch(0.97 0.03 85)" }}
            >
              <h2 className="font-serif text-4xl">{t.contact.thanks} {form.name || t.contact.friend} —</h2>
              <p className="mt-3 opacity-90">{t.contact.gotNoteA} <strong>{form.siteType}</strong>{t.contact.gotNoteB}</p>
              <Link to="/" className="mt-8 inline-block rounded-full bg-white/15 px-5 py-2 text-sm">{t.nav.back}</Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-10 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label={t.contact.name} required>
                  <input required value={form.name} onChange={onChange("name")} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                </Field>
                <Field label={t.contact.email} required>
                  <input required type="email" value={form.email} onChange={onChange("email")} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label={t.contact.phone}>
                  <input type="tel" value={form.phone} onChange={onChange("phone")} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                </Field>
                <Field label={t.contact.siteType} required>
                  <select required value={form.siteType} onChange={onChange("siteType")} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                    {SITE_TYPES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
              <Field label={t.contact.description} required>
                <textarea required rows={6} value={form.description} onChange={onChange("description")} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder={t.contact.descPlaceholder} />
              </Field>
              {error && <p className="text-sm" style={{ color: "var(--coral)" }}>{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
                style={{ backgroundColor: "var(--cobalt)" }}
              >
                {sending ? t.contact.sending : t.contact.send}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label}{required && <span style={{ color: "var(--coral)" }}> *</span>}
      </span>
      {children}
    </label>
  );
}
