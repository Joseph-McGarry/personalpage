
import Image from "next/image";
import Script from "next/script";
import Projects from "./projects/projects";
import AboutClient from "./clients/AboutClient";
import ShuffleClient from "./clients/ShuffleClient";
import LinksClient from "./clients/LinksClient";
import NavBar from "./components/NavBar";
import SkillsPills from "./components/SkillsPills";
import RibbonWander from "./components/RibbonWander";



export const metadata = {
  title: "Joseph McGarry - Software Engineer",
  description:
    "Portfolio of Joseph McGarry, a passionate full-stack software engineer specializing in React, Node.js, and modern web technologies.",
  keywords: [
    "Joseph McGarry",
    "Software Engineer",
    "React",
    "Node.js",
    "Portfolio",
    "Web Development",
    "Full-Stack",
  ],
  authors: [{ name: "Joseph McGarry" }],
  alternates: { canonical: "https://josephmcgarry.dev/" },
  openGraph: {
    title: "Joseph McGarry - Software Engineer",
    description:
      "Explore Joseph McGarry's portfolio, showcasing skills, projects, and expertise in modern web development.",
    url: "https://josephmcgarry.dev/",
    images: [{ url: "/joe.jpeg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Joseph McGarry",
    jobTitle: "Software Engineer",
    url: "https://josephmcgarry.dev/",
    sameAs: [
      "https://www.linkedin.com/in/joseph-mcgarry",
      "https://github.com/Joseph-McGarry",
    ],
    image: "/joe.jpeg",
    description:
      "Full-stack software engineer specializing in React, Node.js, and building innovative projects.",
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <NavBar />
      <RibbonWander />

      <main className="page-bg min-h-screen w-full px-5 md:px-10 lg:px-10 pb-16">
        {/* HERO */}
          <section className="mx-auto w-full max-w-screen-lg pt-10 md:pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left: copy */}
              <div className="text-left">
                <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                  Full-Stack Engineer{" "}
                  <span className="relative inline-block">
                    <span className="text-3xl text-accent">Clean code. Bold results.</span>
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent blur-[1px]" />
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent/60 blur-[4px]" />
                  </span>
                </h1>

                <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-prose">
                I ship web and mobile apps with strong fundamentals: clean UI, fast APIs, and maintainable systems.
                </p>

                <ul className="mt-6 space-y-3 text-sm md:text-base text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-accent shadow-neon" />
                    <span> React · Next.js · React Native: web to mobile</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-accent shadow-neon" />
                    <span>RAG agent with citations and out-of-scope refusal</span>
                    
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-accent shadow-neon" />
                    <span>GraphQL caching for Bun — 15x p95 latency improvement</span>
                  </li>
                </ul>

                {/* CTA row */}
                <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { label: "GitHub", href: "https://github.com/Joseph-McGarry" },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/joseph-mcgarry" },
                    { label: "BuQL", href: "https://buql.dev" },
                    { label: "Medium", href: "https://medium.com/@dylan.e.briar/looking-for-a-graphql-caching-solution-in-bun-its-time-to-buql-up-b2742f07847f" },
                    { label: "npm", href: "https://www.npmjs.com/package/@buql/buql" },
                    { label: "YouTube", href: "https://www.youtube.com/watch?v=0uBBJrszzUE&t=5s" },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-white/10 bg-card/30 px-3 py-2 text-sm
                                hover:border-accent/60 hover:text-accent hover:shadow-neon transition
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: portrait */}
              <div className="lg:justify-self-end w-full max-w-[520px]">
                <div className="relative">
                  {/* neon halo behind the card */}
                  <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-accent/15 blur-3xl opacity-70" />
                  <div className="pointer-events-none absolute -inset-10 rounded-[2.5rem] bg-accent/10 blur-[60px] opacity-60" />

                  {/* the card itself */}
                  <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-card/40 backdrop-blur">
                    <Image
                      src="/joe.jpeg"
                      alt="Joseph McGarry, Software Engineer"
                      width={520}
                      height={520}
                      priority
                      className="w-full h-auto rounded-2xl grayscale contrast-115"
                      suppressHydrationWarning
                    />

                    {/* Vignette */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-90 group-hover:opacity-50 transition
                                bg-[radial-gradient(ellipse_at_center,transparent_35%,black_100%)]"
                    />

                    {/* Grain */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay
                                [background-image:url('/noise.png')] bg-repeat"
                    />

                    {/* Neon edge ring */}
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-accent/15 rounded-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* ABOUT + SKILLS (side-by-side like reference) */}
        <section className="mx-auto w-full max-w-screen-lg mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div id="about" className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur p-6">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              <span className="relative">
                About
                <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-accent/70 blur-[1px]" />
              </span>
            </h2>
            <div className="mt-4">
              <AboutClient />
            </div>
          </div>

          <div id="skills" className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur p-6">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              <span className="relative">
                Skills
                <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-accent/70 blur-[1px]" />
              </span>
            </h2>
            <div className="mt-4">
              {/* <ShuffleClient /> */}
              <SkillsPills />
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mx-auto w-full max-w-screen-lg mt-14 md:mt-20">
          <Projects />
        </section>

        <footer className="mt-16 text-xs md:text-sm text-center text-muted-foreground">
          © {new Date().getFullYear()} Joseph McGarry. All rights reserved. <br />
          <span className="text-accent">Next.js</span> | TypeScript | Tailwind CSS
        </footer>
      </main>
    </>
  );
}
