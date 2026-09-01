import { cn } from "@/lib/utils";

type PhoneMockupProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function PhoneMockup({ src, alt, className, priority = false }: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[15rem] sm:max-w-[16rem]",
        className,
      )}
      aria-hidden={false}
    >
      {/* Glow di belakang peranti */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-[3rem] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-2xl"
        aria-hidden="true"
      />

      {/* Bingkai telefon */}
      <div className="relative rounded-[2.75rem] border border-white/10 bg-zinc-900 p-2 shadow-lift ring-1 ring-black/20 dark:border-white/15 dark:ring-white/10">
        {/* Butang sisi kiri */}
        <div
          className="absolute -left-[2px] top-[22%] h-8 w-[3px] rounded-l-sm bg-zinc-700 dark:bg-zinc-600"
          aria-hidden="true"
        />
        <div
          className="absolute -left-[2px] top-[34%] h-12 w-[3px] rounded-l-sm bg-zinc-700 dark:bg-zinc-600"
          aria-hidden="true"
        />
        <div
          className="absolute -left-[2px] top-[48%] h-12 w-[3px] rounded-l-sm bg-zinc-700 dark:bg-zinc-600"
          aria-hidden="true"
        />
        {/* Butang sisi kanan */}
        <div
          className="absolute -right-[2px] top-[30%] h-16 w-[3px] rounded-r-sm bg-zinc-700 dark:bg-zinc-600"
          aria-hidden="true"
        />

        {/* Skrin */}
        <div className="relative overflow-hidden rounded-[2.25rem] bg-zinc-950">
          {/* Dynamic Island */}
          <div
            className="pointer-events-none absolute left-1/2 top-3 z-10 h-[22px] w-[72px] -translate-x-1/2 rounded-full bg-black/90 ring-1 ring-white/10"
            aria-hidden="true"
          />

          <img
            src={src}
            alt={alt}
            width={640}
            height={1280}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="aspect-[1/2] h-auto w-full object-cover object-top"
          />
        </div>
      </div>

      {/* Bayang pantulan ringan */}
      <div
        className="pointer-events-none mx-auto mt-4 h-3 w-[70%] rounded-full bg-primary/15 blur-md"
        aria-hidden="true"
      />
    </div>
  );
}
