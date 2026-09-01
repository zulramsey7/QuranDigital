import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { Mail, Menu, Moon, Sun } from "lucide-react";

import logo from "@/assets/logo.png";
import { OG_IMAGE_PATH, OG_IMAGE_URL, SITE_TAGLINE } from "@/lib/site-meta";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// ------------------------------------------------------------------
// Gantikan URL di bawah dengan pautan sebenar sebelum publish.
// ------------------------------------------------------------------
export const GOOGLE_PLAY_URL = "YOUR_GOOGLE_PLAY_URL";
export const PRIVACY_POLICY_URL =
  "https://zulramsey7.github.io/QuranDigital/QuranDigital-Privacy-Policy/";
// Gantikan dengan emel sebenar untuk pertanyaan iklan.
export const ADS_CONTACT_EMAIL = "jomngaji.my@gmail.com";
export const CONTACT_EMAIL = "jomngaji.my@gmail.com";
export const ADS_CONTACT_SUBJECT = "Pertanyaan Pengiklanan di Aplikasi JomNgaji";

export { OG_IMAGE_PATH, OG_IMAGE_URL };

export const SOCIAL_LINKS = [
  // Tambah pautan sebenar bila sedia:
  // { label: "Instagram", href: "https://instagram.com/jomngaji", icon: Instagram },
  // { label: "Facebook", href: "https://facebook.com/jomngaji", icon: Facebook },
] as { label: string; href: string; icon: LucideIcon }[];

export const FOOTER_LINKS = [
  { to: "/" as const, label: "Laman Utama" },
  { to: "/features" as const, label: "Ciri-ciri" },
  { to: "/iklan" as const, label: "Iklan" },
  { to: "/tentang" as const, label: "Tentang" },
  { to: "/privacy" as const, label: "Dasar Privasi" },
];

export const NAV_LINKS = [
  { to: "/" as const, label: "Home" },
  { to: "/features" as const, label: "Ciri-ciri" },
  { to: "/iklan" as const, label: "Iklan" },
  { to: "/tentang" as const, label: "Tentang" },
  { to: "/privacy" as const, label: "Privacy" },
];

function NavLink({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="transition-colors hover:text-primary"
      activeProps={{ className: "text-primary font-semibold" }}
    >
      {label}
    </Link>
  );
}

export function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("jomngaji-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("jomngaji-theme", next ? "dark" : "light");
      return next;
    });
  };

  return { dark, toggle };
}

export function SiteHeader() {
  const { dark, toggle } = useDarkMode();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="Logo JomNgaji"
            width={36}
            height={36}
            className="rounded-xl shadow-soft"
          />
          <span className="text-lg font-bold tracking-tight">
            Jom<span className="text-primary">Ngaji</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:hidden"
              aria-label="Buka menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">
                  Jom<span className="text-primary">Ngaji</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-5 text-base font-medium text-muted-foreground">
                {NAV_LINKS.map((link) => (
                  <SheetClose key={link.to} asChild>
                    <NavLink to={link.to} label={link.label} />
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-8">
                <SheetClose asChild>
                  <a
                    href={GOOGLE_PLAY_URL}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-primary/90"
                  >
                    Muat Turun
                  </a>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>

          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Tukar ke light mode" : "Tukar ke dark mode"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
          <a
            href={GOOGLE_PLAY_URL}
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:shadow-lift sm:inline-flex"
          >
            Muat Turun
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img src={logo} alt="Logo JomNgaji" width={36} height={36} className="rounded-xl shadow-soft" />
              <span className="text-lg font-bold tracking-tight">
                Jom<span className="text-primary">Ngaji</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {SITE_TAGLINE}. Baca Quran, waktu solat, arah kiblat dan audio murottal — semuanya dalam satu aplikasi.
            </p>
            {SOCIAL_LINKS.length > 0 && (
              <div className="mt-5 flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:bg-accent hover:text-primary"
                  >
                    <social.icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Pautan */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Pautan</h3>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              {FOOTER_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} label={link.label} />
              ))}
              <a href="/#faq" className="transition-colors hover:text-primary">
                Soalan Lazim
              </a>
            </nav>
          </div>

          {/* Muat turun */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Muat Turun</h3>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <a
                href={GOOGLE_PLAY_URL}
                className="inline-flex transition-colors hover:text-primary"
              >
                Google Play Store
              </a>
              <p>Percuma untuk semua pengguna Android.</p>
            </div>
          </div>

          {/* Hubungi */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Hubungi</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${ADS_CONTACT_EMAIL}?subject=${encodeURIComponent(ADS_CONTACT_SUBJECT)}`}
                  className="transition-colors hover:text-primary"
                >
                  Iklan: {ADS_CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} JomNgaji. Hak cipta terpelihara.</p>
          <p>Dibangunkan di Malaysia 🇲🇾</p>
        </div>
      </div>
    </footer>
  );
}

export function GooglePlayButton({ large = false }: { large?: boolean }) {
  return (
    <a
      href={GOOGLE_PLAY_URL}
      className={
        large
          ? "inline-flex items-center gap-3 rounded-2xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lift transition-all hover:bg-primary/90 hover:-translate-y-0.5"
          : "inline-flex items-center gap-3 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:-translate-y-0.5"
      }
    >
      <svg viewBox="0 0 24 24" className={large ? "h-6 w-6" : "h-5 w-5"} fill="currentColor" aria-hidden="true">
        <path d="M3.6 2.3c-.36.38-.6.96-.6 1.72v15.96c0 .76.24 1.34.62 1.7l.09.08 8.95-8.95v-.21L3.7 2.22l-.1.08Z" />
        <path d="m15.4 15.36-2.74-2.75v-.21l2.75-2.75.06.04 3.26 1.85c.93.53.93 1.4 0 1.93l-3.26 1.85-.07.04Z" opacity=".85" />
        <path d="M15.47 15.32 12.66 12.5 3.6 21.68c.31.32.81.36 1.38.04l10.49-5.95" opacity=".7" />
        <path d="M15.47 9.68 4.98 3.73c-.57-.32-1.07-.28-1.38.04l9.06 9.18 2.81-2.82" opacity=".55" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-xs font-medium opacity-85">Download di</span>
        <span className={large ? "block text-lg font-bold" : "block font-bold"}>Google Play</span>
      </span>
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground">{desc}</p>}
    </div>
  );
}
