import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading, ADS_CONTACT_EMAIL, CONTACT_EMAIL } from "@/components/site";

const faqs = [
  {
    q: "Adakah JomNgaji percuma?",
    a: "Ya, JomNgaji boleh dimuat turun dan digunakan secara percuma di Android. Tiada bayaran untuk membaca Al-Quran, semak waktu solat atau gunakan arah kiblat.",
  },
  {
    q: "Perlu internet untuk guna aplikasi?",
    a: "Bacaan Al-Quran dan kebanyakan ciri asas boleh digunakan tanpa internet. Ciri seperti waktu solat mengikut lokasi dan audio murottal memerlukan sambungan internet.",
  },
  {
    q: "Adakah ada iklan dalam aplikasi?",
    a: "Aplikasi mungkin memaparkan iklan untuk menampung kos operasi. Iklan direka supaya tidak mengganggu pengalaman mengaji anda.",
  },
  {
    q: "Android sahaja ke?",
    a: "Buat masa ini JomNgaji tersedia di Google Play untuk peranti Android. Versi iOS akan diumumkan jika tersedia pada masa hadapan.",
  },
  {
    q: "Bagaimana cara hubungi sokongan?",
    a: `Anda boleh hantar emel kepada kami di ${CONTACT_EMAIL} untuk pertanyaan umum, atau ${ADS_CONTACT_EMAIL} untuk pertanyaan pengiklanan.`,
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-20 sm:px-6 lg:py-24">
      <SectionHeading
        eyebrow="Soalan Lazim"
        title="Ada soalan? Kami jawab di sini"
        desc="Jawapan ringkas untuk perkara yang sering ditanya tentang aplikasi JomNgaji."
      />

      <Accordion type="single" collapsible className="mt-12 rounded-3xl border border-border bg-card px-6 shadow-soft sm:px-8">
        {faqs.map((faq, i) => (
          <AccordionItem key={faq.q} value={`faq-${i}`} className="border-border/80">
            <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
