'use client';

import Link from 'next/link';

export default function NavBar() {
  const item =
    "text-sm text-muted-foreground hover:text-foreground transition-colors";

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="border-b border-white/10 bg-background/60 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-screen-lg items-center justify-between px-5">
          {/* LEFT CLUSTER: Name + links */}
          <div className="flex items-center gap-8">
            {/* Name (larger) */}
            <Link
              href="/"
              // className="text-lg md:text-xl font-semibold tracking-tight text-foreground"
              className="text-xl md:text-2xl font-semibold tracking-tight text-foreground"
            >
              Joseph McGarry
            </Link>

            {/* Links next to name (left-aligned) */}
            <nav className="hidden md:flex items-center gap-6">
              <a className={item} href="#projects">Projects</a>
              <a className={item} href="#skills">Skills</a>
              <a className={item} href="#about">About</a>
            </nav>
          </div>

          {/* RIGHT: Resume */}
          <a
            href="/joseph-mcgarry-resume.pdf"
            download
            // pink text and glow on hover
            className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-xl border border-white/10 bg-card/30 px-3 py-2 text-sm
                      hover:border-accent/60 hover:text-accent hover:shadow-neon transition
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"

            // pink text on hover
            // className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm
            //           hover:border-accent/60 hover:text-accent transition-colors
            //           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"

            // pink bg white text with small glow, black text on hover
            // className="inline-flex items-center gap-2 rounded-xl bg-accent text-accent-fg px-3 py-2 text-sm font-medium shadow-neon
            // hover:bg-accent/90 hover:text-neutral-900 transition-colors
            // focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
              suppressHydrationWarning
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="M7 10l5 5 5-5" />
              <path d="M12 15V3" />
            </svg>
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
