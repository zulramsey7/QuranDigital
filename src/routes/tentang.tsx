import { createFileRoute } from "@tanstack/react-router";

import { GooglePlayButton, SectionHeading, SiteFooter, SiteHeader } from "@/components/site";
import { pageMeta } from "@/lib/site-meta";

export const Route = createFileRoute("/tentang")({
  component: TentangPage,
  head: () =>
    pageMeta({
      title: "Tentang JomNgaji – Al-Quran Digital Untuk Semua",
      description:
        "Ketahui lebih lanjut tentang JomNgaji — aplikasi Al-Quran digital yang ringan, moden dan percuma untuk semua.",
      path: "/tentang",
    }),
});

const credits = [
  { name: "quran.foundation", role: "Sumber teks Al-Quran" },
  { name: "WaktuSolat.app", role: "Data waktu solat" },
  { name: "shadcn-ui", role: "Komponen UI" },
  { name: "Lucide", role: "Ikon" },
];

function TentangPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
        <div className="rounded-4xl border border-border bg-card p-8 shadow-soft sm:p-12">
          <SectionHeading eyebrow="Tentang" title="Tentang JomNgaji" />
          <div className="mt-6 space-y-4 text-center leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              <strong className="font-semibold text-foreground">JomNgaji</strong> lahir daripada
              hasrat mudah — menjadikan ngaji lebih mudah diakses oleh semua. Dengan reka bentuk
              yang bersih dan ciri-ciri yang fokus, JomNgaji menghimpunkan Al-Quran digital, waktu
              solat, arah kiblat dan bacaan audio dalam satu aplikasi yang ringan.
            </p>
            <p>
              Sama ada anda baru mula menghafaz atau sudah lama bermusafir, JomNgaji dijemput
              menemani setiap sujud anda — di rumah, di pejabat, atau di mana sahaja anda berada.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <GooglePlayButton />
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Credits & Penghargaan
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {credits.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border border-border bg-card px-4 py-5 text-center shadow-soft"
              >
                <p className="text-sm font-bold">{c.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{c.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
