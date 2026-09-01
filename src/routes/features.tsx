import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Bookmark, Clock, Compass, Moon, Volume2 } from "lucide-react";

import { GooglePlayButton, SectionHeading, SiteFooter, SiteHeader } from "@/components/site";
import { pageMeta } from "@/lib/site-meta";

export const Route = createFileRoute("/features")({
  component: FeaturesPage,
  head: () =>
    pageMeta({
      title: "Ciri-ciri JomNgaji – Al-Quran Digital",
      description:
        "Ketahui semua ciri aplikasi JomNgaji: bacaan Al-Quran, waktu solat, arah kiblat, audio murottal, bookmark dan dark mode.",
      path: "/features",
    }),
});

const features = [
  {
    icon: BookOpen,
    title: "Al-Quran",
    desc: "Baca Al-Quran lengkap 30 juzuk dengan paparan yang jelas dan selesa untuk semua peringkat umur.",
  },
  {
    icon: Clock,
    title: "Waktu Solat",
    desc: "Jadual waktu solat harian yang tepat, lengkap dengan peringatan sebelum masuk waktu.",
  },
  {
    icon: Compass,
    title: "Arah Kiblat",
    desc: "Kompas kiblat pintar yang membantu anda pastikan arah solat sentiasa betul di mana-mana.",
  },
  {
    icon: Volume2,
    title: "Audio Quran",
    desc: "Bacaan murottal dengan suara jernih untuk didengari sambil mengikut bacaan ayat demi ayat.",
  },
  {
    icon: Bookmark,
    title: "Bookmark",
    desc: "Tandai ayat dan halaman kegemaran, kemudian sambung bacaan anda dari tempat terakhir berhenti.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    desc: "Mod gelap yang direka khas untuk bacaan yang selesa pada waktu malam tanpa meredakan mata.",
  },
];

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          eyebrow="Ciri-ciri"
          title="Semua yang anda perlukan untuk ngaji"
          desc="Direka dengan tumpuan pada pengalaman bacaan yang terbaik untuk setiap pengguna."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <GooglePlayButton large />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
