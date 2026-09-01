import { createFileRoute } from "@tanstack/react-router";
import {
  BadgePercent,
  CalendarClock,
  Check,
  ClipboardList,
  FileText,
  Handshake,
  LayoutGrid,
  Mail,
  MapPin,
  Megaphone,
  MessageSquareText,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  ADS_CONTACT_EMAIL,
  ADS_CONTACT_SUBJECT,
  SectionHeading,
  SiteFooter,
  SiteHeader,
} from "@/components/site";
import { pageMeta } from "@/lib/site-meta";
import iklanPlacement from "@/assets/iklan-placement.jpg";

export const Route = createFileRoute("/iklan")({
  component: IklanPage,
  head: () =>
    pageMeta({
      title: "Iklan di JomNgaji – Pakej Pengiklanan",
      description:
        "Iklankan bisnes anda di aplikasi JomNgaji. Pilih pakej Basic, Pro atau Premium — banner dalam aplikasi, slot promosi dan tajaan kepada komuniti pengguna Muslim yang aktif.",
      path: "/iklan",
    }),
});

const mailto = `mailto:${ADS_CONTACT_EMAIL}?subject=${encodeURIComponent(ADS_CONTACT_SUBJECT)}`;

/* ---------------- Data ---------------- */

const packages = [
  {
    icon: BadgePercent,
    name: "Basic",
    price: "RM99",
    period: "/bulan",
    tagline: "Sesuai untuk bisnes kecil yang baru bermula.",
    duration: "Tayangan 30 hari",
    placements: ["Banner kecil di halaman utama", "Rotasi bersama pengiklan lain"],
    features: [
      "1 banner statik (imej disediakan anda)",
      "Paparan ~10,000 impression/bulan",
      "Laporan ringkas akhir kempen",
      "Sokongan melalui emel",
    ],
    highlighted: false,
  },
  {
    icon: Rocket,
    name: "Pro",
    price: "RM249",
    period: "/bulan",
    tagline: "Paling popular — pendedahan lebih luas dan konsisten.",
    duration: "Tayangan 30 hari",
    placements: [
      "Banner utama di halaman utama",
      "Slot promosi di skrin Waktu Solat",
    ],
    features: [
      "2 banner (statik atau animasi ringan)",
      "Paparan ~50,000 impression/bulan",
      "Keutamaan rotasi iklan",
      "Laporan prestasi mingguan",
      "1x tukar kreatif iklan percuma",
    ],
    highlighted: true,
  },
  {
    icon: Sparkles,
    name: "Premium",
    price: "RM499",
    period: "/bulan",
    tagline: "Pendedahan maksimum untuk jenama yang serius.",
    duration: "Tayangan 30 hari (boleh lanjut)",
    placements: [
      "Banner utama semua skrin utama",
      "Slot tajaan eksklusif (skrin Kiblat / Audio)",
      "Kad promosi dalam senarai Bookmark",
    ],
    features: [
      "Banner tanpa had rotasi",
      "Paparan ~150,000 impression/bulan",
      "Slot eksklusif — tiada pesaing sehalaman",
      "Laporan penuh + perbincangan strategi",
      "Tukar kreatif tanpa had",
      "Sokongan keutamaan (WhatsApp/emel)",
    ],
    highlighted: false,
  },
];

const steps = [
  {
    icon: MessageSquareText,
    title: "Hubungi Kami",
    desc: "Emelkan pertanyaan anda beserta maklumat bisnes dan pakej yang diminati.",
  },
  {
    icon: FileText,
    title: "Pengesahan & Sebutharga",
    desc: "Kami balas dalam 1–2 hari bekerja dengan sebutharga rasmi dan ketersediaan slot.",
  },
  {
    icon: ClipboardList,
    title: "Hantar Bahan Iklan",
    desc: "Serahkan artwork banner mengikut spesifikasi yang kami berikan (kami boleh bantu reka).",
  },
  {
    icon: Handshake,
    title: "Iklan Mula Bersiaran",
    desc: "Selepas bayaran disahkan, iklan anda mula dipaparkan mengikut tempoh pakej.",
  },
];

const highlights = [
  {
    icon: Users,
    title: "Audiens Muslim Aktif",
    desc: "Pengguna yang membuka aplikasi setiap hari untuk bacaan Quran dan waktu solat.",
  },
  {
    icon: Target,
    title: "Relevan & Halal",
    desc: "Sesuai untuk produk halal, pendidikan Islam, kewangan syariah, fesyen muslimah dan banyak lagi.",
  },
  {
    icon: TrendingUp,
    title: "Komuniti Berkembang",
    desc: "Jumlah pengguna JomNgaji terus meningkat — jenama anda membesar bersama kami.",
  },
  {
    icon: MapPin,
    title: "Fokus Malaysia",
    desc: "Capai pengguna tempatan di seluruh Malaysia, sesuai untuk perniagaan dalam negara.",
  },
];

/* ---------------- Page ---------------- */

function IklanPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <IklanHero />
        <Highlights />
        <PlacementShowcase />
        <Packages />
        <HowItWorks />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ---------------- Sections ---------------- */

function IklanHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pattern-islamic pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-20 text-center sm:px-6 lg:pt-28">
        <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
          <Megaphone className="h-3.5 w-3.5" aria-hidden="true" />
          Ruang Iklan Terhad
        </span>
        <h1 className="animate-fade-up-delay-1 mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Iklankan Bisnes Anda di{" "}
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            JomNgaji
          </span>
        </h1>
        <p className="animate-fade-up-delay-2 mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Dedahkan jenama anda kepada ribuan pengguna Muslim yang aktif setiap hari.
          Pilih pakej yang sesuai dengan bajet anda — kami uruskan selebihnya.
        </p>
        <div className="animate-fade-up-delay-2 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#pakej"
            className="inline-flex items-center gap-2.5 rounded-2xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lift transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Lihat Pakej
          </a>
          <a
            href={mailto}
            className="inline-flex items-center gap-2.5 rounded-2xl border border-border bg-card px-7 py-4 text-base font-semibold shadow-soft transition-all hover:bg-accent hover:text-accent-foreground"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <SectionHeading
        eyebrow="Kenapa JomNgaji"
        title="Platform yang tepat untuk jenama Muslim"
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((h) => (
          <div
            key={h.title}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-primary">
              <h.icon className="h-5.5 w-5.5" strokeWidth={1.8} />
            </div>
            <h3 className="mt-4 font-bold">{h.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PlacementShowcase() {
  return (
    <section className="border-y border-border bg-secondary/50 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Lokasi Iklan
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Iklan anda, di tempat pengguna paling kerap lihat
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Banner anda dipaparkan pada skrin yang paling tinggi trafik dalam aplikasi —
              halaman utama, skrin Waktu Solat, Kiblat dan Audio Quran. Reka bentuk iklan
              kami kemas dan tidak mengganggu pengalaman mengaji.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Halaman utama — banner atas & bawah",
                "Skrin Waktu Solat — slot promosi harian",
                "Skrin Kiblat & Audio — slot tajaan",
                "Saiz standard banner mudah disediakan",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-4xl border border-border shadow-lift">
            <img
              src={iklanPlacement}
              alt="Contoh penempatan iklan banner dalam aplikasi JomNgaji"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="pakej" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading
        eyebrow="Pakej Pengiklanan"
        title="Pilih pakej mengikut bajet anda"
        desc="Semua harga adalah anggaran permulaan — hubungi kami untuk sebutharga rasmi dan tawaran pakej jangka panjang."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {packages.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-4xl border p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
              p.highlighted
                ? "border-primary/40 bg-card ring-2 ring-primary/30"
                : "border-border bg-card"
            }`}
          >
            {p.highlighted && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-soft">
                Paling Popular
              </span>
            )}
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
              <p.icon className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <h3 className="mt-5 text-xl font-bold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>

            <p className="mt-5">
              <span className="text-4xl font-extrabold tracking-tight">{p.price}</span>
              <span className="text-sm font-medium text-muted-foreground"> {p.period}</span>
            </p>

            <div className="mt-5 space-y-2 rounded-2xl bg-secondary/70 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-secondary-foreground">
                <CalendarClock className="h-4 w-4 text-primary" aria-hidden="true" />
                {p.duration}
              </p>
              {p.placements.map((pl) => (
                <p key={pl} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <LayoutGrid className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {pl}
                </p>
              ))}
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={`${mailto}&body=${encodeURIComponent(`Assalamualaikum, saya berminat dengan pakej ${p.name} (${p.price}${p.period}).`) }`}
              className={`mt-8 inline-flex items-center justify-center rounded-2xl px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                p.highlighted
                  ? "bg-primary text-primary-foreground shadow-lift hover:bg-primary/90"
                  : "border border-border bg-card shadow-soft hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              Pilih {p.name}
            </a>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        * Harga tertakluk kepada perubahan. Diskaun tersedia untuk langganan 3 bulan dan ke atas.
      </p>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="border-y border-border bg-secondary/50 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Cara Bekerja"
          title="Mula beriklan dalam 4 langkah mudah"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="absolute right-5 top-5 text-4xl font-extrabold text-primary/15">
                {i + 1}
              </span>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-primary">
                <s.icon className="h-5.5 w-5.5" strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="relative overflow-hidden rounded-4xl border border-border bg-card p-8 text-center shadow-lift sm:p-12">
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-64 w-[30rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lift">
            <Megaphone className="h-7 w-7" strokeWidth={1.8} />
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
            Sedia untuk mempromosikan bisnes anda?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Hantarkan pertanyaan anda hari ini — kami akan balas dengan kadar terkini,
            ketersediaan slot dan statistik pengguna aplikasi.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={mailto}
              className="inline-flex items-center gap-2.5 rounded-2xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lift transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              Hubungi Kami Untuk Beriklan
            </a>
            <a
              href={mailto}
              className="text-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
            >
              {ADS_CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
