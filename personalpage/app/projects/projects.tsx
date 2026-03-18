'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Projects() {
  return (
    <section className="w-full max-w-screen-lg mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        Featured Projects
      </h2>
      <div className="mt-6 h-px w-full bg-white/10" />

      {/* <p className="mt-2 text-sm text-muted-foreground">
        A few builds that show how I think and ship.
      </p> */}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Abstractify */}
        <div className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur overflow-hidden
           hover:border-accent/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]
           transition">
          <div className="flex flex-col md:flex-row gap-4 p-5">
            <div className="flex-1">
              <h3 className="text-lg font-semibold tracking-tight">Abstractify</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A generative art tool built on random walk algorithms. Pick your shape, tweak speed, distance, and color. Download the result.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {['Next.js', 'TypeScript', 'React', 'Canvas API', 'Tailwind CSS'].map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-white/10 px-2 py-1 text-xs text-muted-foreground w-fit"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Image — mobile only, sits between pills and buttons */}
              <div className="relative w-full h-40 mt-4 md:hidden rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/Abstractify2.png"
                  alt="Abstractify preview"
                  fill
                  sizes="100%"
                  className="object-cover contrast-110"
                  suppressHydrationWarning
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-accent/10" />
              </div>

              <div className="mt-5 flex gap-3">
                <Link
                  href="/projects/randomwalk"
                  className="inline-flex items-center rounded-xl bg-accent text-accent-fg px-3 py-2 text-sm font-medium shadow-neon
                    hover:bg-accent/90 hover:text-neutral-900 transition-colors
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  Live
                </Link>
                <a
                  href="https://github.com/Joseph-McGarry/personalpage/tree/main/personalpage/app/projects/randomwalk"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-xl border border-white/10 px-3 py-2 text-sm
                            hover:border-accent/60 hover:text-accent transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Image — desktop only, sits on the side */}
            <div className="relative hidden md:block md:w-40 md:h-28 md:shrink-0 rounded-xl overflow-hidden border border-white/10">
              <Image
                src="/Abstractify2.png"
                alt="Abstractify preview"
                fill
                sizes="160px"
                className="object-cover contrast-110"
                suppressHydrationWarning
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-accent/10" />
            </div>

          </div>
        </div>

        {/* Soupfeld (kept commented out, but updated to new card style) */}
        {/*
        <div className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur overflow-hidden hover:border-accent/50 transition-colors">
          <div className="flex gap-4 p-5">
            <div className="flex-1">
              <h3 className="text-lg font-semibold tracking-tight">Soupfeld</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Seinfeld-themed random soup generator integrating the OpenAI API to produce unique, character-inspired recipes with a touch of humor and creativity.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {['Next.js', 'OpenAI API', 'Prompting'].map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-white/10 px-2 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-3">
                <Link
                  href="/projects/soupfeld"
                  className="inline-flex items-center rounded-xl bg-accent text-accent-fg px-3 py-2 text-sm font-medium shadow-neon"
                >
                  Live
                </Link>

                <a
                  href="https://github.com/Joseph-McGarry"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-xl border border-white/10 px-3 py-2 text-sm
                             hover:border-accent/60 hover:text-accent transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="relative w-40 h-28 rounded-xl overflow-hidden border border-white/10 shrink-0">
              <Image
                src="/soup2.png"
                alt="Soupfeld preview"
                fill
                className="object-cover contrast-110"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-accent/10" />
            </div>
          </div>
        </div>
        */}

        {/* Tessellator */}
        <div className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur overflow-hidden
             hover:border-accent/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]
             transition">
          <div className="flex flex-col md:flex-row gap-4 p-5">
            <div className="flex-1">
              <h3 className="text-lg font-semibold tracking-tight">Tessellator</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A grid-based design tool for building and tessellating geometric patterns. Paint cells or triangles, rotate rows and columns.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {['Next.js', 'TypeScript', 'React', 'Canvas API', 'html2canvas', 'Tailwind CSS'].map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-white/10 px-2 py-1 text-xs text-muted-foreground w-fit"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Image — mobile only, sits between pills and buttons */}
              <div className="relative w-full h-40 mt-4 md:hidden rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/tessellationScreenshot.png"
                  alt="Tessellator preview"
                  fill
                  sizes="100%"
                  className="object-cover contrast-110"
                  suppressHydrationWarning
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-accent/10" />
              </div>

              <div className="mt-5 flex gap-3">
                <Link
                  href="/projects/tessellations"
                  className="inline-flex items-center rounded-xl bg-accent text-accent-fg px-3 py-2 text-sm font-medium shadow-neon
                    hover:bg-accent/90 hover:text-neutral-900 transition-colors
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  Live
                </Link>

                <a
                  href="https://github.com/Joseph-McGarry/personalpage/tree/main/personalpage/app/projects/tessellations"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-xl border border-white/10 px-3 py-2 text-sm
                             hover:border-accent/60 hover:text-accent transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Image — desktop only, sits on the side */}
            <div className="relative hidden md:block md:w-40 md:h-28 md:shrink-0 rounded-xl overflow-hidden border border-white/10">
              <Image
                src="/tessellationScreenshot.png"
                alt="Tessellator preview"
                fill
                sizes="160px"
                className="object-cover contrast-110"
                suppressHydrationWarning
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-accent/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
