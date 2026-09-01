import { createFileRoute } from "@tanstack/react-router";

import { PRIVACY_POLICY_URL, SiteFooter, SiteHeader } from "@/components/site";
import { pageMeta } from "@/lib/site-meta";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () =>
    pageMeta({
      title: "Dasar Privasi – JomNgaji",
      description:
        "Dasar privasi JomNgaji. Ketahui bagaimana data anda dikumpul, digunakan dan dilindungi.",
      path: "/privacy",
    }),
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
        <div className="rounded-4xl bg-secondary p-8 sm:p-12">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Privacy Policy</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground sm:text-lg">
            Privasi anda penting. JomNgaji tidak menjual data peribadi anda dan hanya mengumpulkan
            maklumat minimum yang diperlukan untuk menjalankan ciri aplikasi seperti waktu solat
            mengikut lokasi. Untuk butiran penuh tentang data yang dikumpul, cara penggunaan dan
            hak anda sebagai pengguna, sila rujuk Privacy Policy lengkap kami.
          </p>
          <a
            href={PRIVACY_POLICY_URL}
            className="mt-6 inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
          >
            Baca Privacy Policy penuh
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
