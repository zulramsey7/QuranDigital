import { createFileRoute, Link } from "@tanstack/react-router";

import { FaqSection } from "@/components/faq-section";
import { PhoneMockup } from "@/components/phone-mockup";
import { GooglePlayButton, SectionHeading, SiteFooter, SiteHeader } from "@/components/site";
import { pageMeta } from "@/lib/site-meta";
import screenQuran from "@/assets/screen-quran.png";
import screenPrayer from "@/assets/screen-prayer.png";
import screenKiblat from "@/assets/screen-kiblat.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () =>
    pageMeta({
      title: "JomNgaji – Al-Quran Digital Untuk Semua",
      description:
        "JomNgaji – aplikasi Al-Quran digital untuk semua. Baca Quran, waktu solat, arah kiblat, audio murottal & bookmark. Muat turun percuma di Google Play.",
      path: "/",
    }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Screenshots />
        <FaqSection />
        <DownloadCta />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pattern-islamic pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:pb-28 lg:pt-24">
        <div className="text-center lg:text-left">
          <p className="animate-fade-up font-arabic text-2xl text-primary" dir="rtl" lang="ar">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <span className="animate-fade-up-delay-1 mt-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            Al-Quran • Waktu Solat • Kiblat
          </span>
          <h1 className="animate-fade-up-delay-1 mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-[3.4rem]">
            JomNgaji –{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Al-Quran Digital
            </span>{" "}
            Untuk Semua
          </h1>
          <p className="animate-fade-up-delay-2 mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            JomNgaji ialah aplikasi Al-Quran digital yang moden dan mudah digunakan.
            Baca Quran, semak waktu solat, tentukan arah kiblat dan dengar bacaan
            murottal — semuanya dalam satu aplikasi, percuma di Google Play.
          </p>
          <div className="animate-fade-up-delay-2 mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start sm:justify-center">
            <GooglePlayButton large />
            <Link
              to="/features"
              className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-7 py-4 text-base font-semibold text-foreground shadow-soft transition-all hover:bg-accent hover:text-accent-foreground"
            >
              Lihat Ciri-ciri
            </Link>
          </div>
          <p className="animate-fade-up-delay-2 mt-5 text-sm text-muted-foreground">
            Percuma untuk semua • Android
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-xs">
          <PhoneMockup
            src={screenQuran}
            alt="Screenshot aplikasi JomNgaji – skrin bacaan Al-Quran"
            className="animate-fade-up-delay-2 max-w-none sm:max-w-[18rem] lg:max-w-[16rem]"
            priority
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Screenshots ---------------- */

const screenshots = [
  { src: screenQuran, alt: "Skrin bacaan Al-Quran dalam aplikasi JomNgaji", caption: "Bacaan Al-Quran" },
  { src: screenPrayer, alt: "Skrin waktu solat harian dalam aplikasi JomNgaji", caption: "Waktu Solat" },
  { src: screenKiblat, alt: "Skrin arah kiblat dalam aplikasi JomNgaji", caption: "Arah Kiblat" },
];

function Screenshots() {
  return (
    <section className="border-y border-border bg-secondary/50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Screenshot"
          title="Pengalaman yang kemas dan selesa"
          desc="Antara muka yang bersih, ringan dan mudah dinavigasi — di telefon mana sahaja."
        />

        <div className="mt-14 grid justify-center gap-10 sm:grid-cols-3 sm:gap-6">
          {screenshots.map((s, i) => (
            <figure
              key={s.caption}
              className={`mx-auto w-full ${i === 1 ? "sm:-translate-y-6" : ""}`}
            >
              <PhoneMockup src={s.src} alt={s.alt} />
              <figcaption className="mt-6 text-center text-sm font-semibold text-muted-foreground">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Download CTA ---------------- */

function DownloadCta() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-24">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Sedia untuk mula ngaji?
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
        Muat turun JomNgaji percuma di Google Play dan mula baca Al-Quran hari ini.
      </p>
      <div className="mt-8 flex justify-center">
        <GooglePlayButton large />
      </div>
    </section>
  );
}
