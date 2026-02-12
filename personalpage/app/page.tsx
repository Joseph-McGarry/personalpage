// 'use client';

// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import Projects from './projects/projects';
// import Head from 'next/head';
// import { motion } from "framer-motion";

// const Shuffle = dynamic(() => import('./shuffle'), { ssr: false });
// const Links = dynamic(() => import('./links'), { ssr: false });
// const About = dynamic(() => import('./about'), { ssr: false });

// export default function Home() {

//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "Person",
//     "name": "Joseph McGarry",
//     "jobTitle": "Software Engineer",
//     "url": "https://josephmcgarry.dev/",
//     "sameAs": [
//       "https://www.linkedin.com/in/joseph-mcgarry",
//       "https://github.com/Joseph-McGarry"
//     ],
//     "image": "/joe.jpeg",
//     "description": "Full-stack software engineer specializing in React, Node.js, and building innovative projects.",
//   };

//   return (
//     <>
//       <Head>
//         <title>Joseph McGarry - Software Engineer</title>
//         <meta name="description" content="Portfolio of Joseph McGarry, a passionate full-stack software engineer specializing in React, Node.js, and modern web technologies." />
//         <meta name="keywords" content="Joseph McGarry, Software Engineer, React, Node.js, Portfolio, Web Development, Full-Stack" />
//         <meta name="author" content="Joseph McGarry" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />

//         {/* Open Graph / Social Sharing */}
//         <meta property="og:title" content="Joseph McGarry - Software Engineer" />
//         <meta property="og:description" content="Explore Joseph McGarry's portfolio, showcasing skills, projects, and expertise in modern web development." />
//         <meta property="og:image" content="/joe.jpeg" />
//         <meta property="og:url" content="https://josephmcgarry.dev/" />
//         <meta name="twitter:card" content="summary_large_image" />

//         {/* Canonical URL */}
//         <link rel="canonical" href="https://josephmcgarry.dev/" />

//         {/* JSON-LD Structured Data */}
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
//       </Head>

//       <main className="min-h-screen w-full flex flex-col items-center justify-center p-5 md:p-10 lg:p-10 space-y-2 sm:space-y-3 md:space-y-5 lg:space-y-10">
//         {/* Top Section (Name and Image) */}
//         <div className="flex flex-col items-center text-center w-full max-w-lg">
//           <header>
//             <h1 className="text-4xl md:text-5xl lg:text-5xl"> Joseph McGarry </h1>
//           </header>
//         </div>

//         {/* STATIC IMAGE */}

//         {/* <Image
//           src="/joe.jpeg"
//           alt="Joseph McGarry, Software Engineer"
//           width={500}
//           height={300}
//           priority
//           // className="w-72 md:w-[28rem] lg:w-[32rem] h-auto"    
//         /> */}

//         {/* Vignette that fades in and out */}

//         <div className="relative group rounded-xl overflow-hidden">
//           <Image
//             src="/joe.jpeg"
//             alt="Joseph McGarry, Software Engineer"
//             width={500}
//             height={300}
//             priority
//             className="w-72 md:w-[28rem] lg:w-[32rem] h-auto rounded-xl contrast-110"
//           />

//           {/* Vignette */}
//           <div className="pointer-events-none absolute inset-0 opacity-100 group-hover:opacity-25 transition
//                           bg-[radial-gradient(ellipse_at_center,transparent_30%,black_100%)]" />

//           {/* Grain (use a tiny seamless noise PNG in /public) */}
//           <div className="pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay
//                           [background-image:url('/noise.png')] bg-repeat" />
//            </div>

//         <div className="flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-5 w-full max-w-5xl rounded border-2 border-white p-5">
//           {/* About Me Section */}
//           <div className="flex flex-col items-center justify-center text-left w-full md:w-1/2 min-h-[400px] h-full">
//             <About />
//           </div>

//           {/* Skills Section */}
//           <div className="flex flex-col items-center justify-center text-left w-full md:w-1/2 min-h-[350px] h-full">
//             <Shuffle />
//           </div>
//         </div>

//         {/* Project Section */}
//         <div className="flex flex-col items-center justify-center text-center w-full max-w-screen-lg">
//           <Projects />
//         </div>

//         <div className="flex flex-col items-center justify-center text-center w-full max-w-lg">
//           <Links />
//         </div>

//         <footer className="text-sm md:text-base lg:text-base text-center mt-8 mb-4">
//           © JOSEPH MCGARRY <br />
//           Next.js | TypeScript | Tailwind CSS
//         </footer>
//       </main>
//     </>
//   );
// }



import Image from "next/image";
import Script from "next/script";
import Projects from "./projects/projects";
import AboutClient from "./clients/AboutClient";
import ShuffleClient from "./clients/ShuffleClient";
import LinksClient from "./clients/LinksClient";



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
  twitter: {
    card: "summary_large_image",
  },
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

      <main className="min-h-screen w-full flex flex-col items-center justify-center p-5 md:p-10 lg:p-10 space-y-2 sm:space-y-3 md:space-y-5 lg:space-y-10">
        <div className="flex flex-col items-center text-center w-full max-w-lg">
          <header>
            <h1 className="text-4xl md:text-5xl lg:text-5xl">
              Joseph McGarry
            </h1>
          </header>
        </div>

        <div className="relative group rounded-xl overflow-hidden">
          <Image
            src="/joe.jpeg"
            alt="Joseph McGarry, Software Engineer"
            width={500}
            height={300}
            priority
            className="w-72 md:w-[28rem] lg:w-[32rem] h-auto rounded-xl contrast-110"
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-100 group-hover:opacity-25 transition
                       bg-[radial-gradient(ellipse_at_center,transparent_30%,black_100%)]"
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay
                       [background-image:url('/noise.png')] bg-repeat"
          />
        </div>

        <div className="flex flex-col items-center justify-center text-left w-full md:w-1/2 min-h-[400px] h-full">
          <AboutClient />
        </div>

        <div className="flex flex-col items-center justify-center text-left w-full md:w-1/2 min-h-[350px] h-full">
          <ShuffleClient />
        </div>
        
        <div className="flex flex-col items-center justify-center text-center w-full max-w-screen-lg">
          <Projects />
        </div>

        <div className="flex flex-col items-center justify-center text-center w-full max-w-lg">
          <LinksClient />
        </div>

        <footer className="text-sm md:text-base lg:text-base text-center mt-8 mb-4">
          © JOSEPH MCGARRY <br />
          Next.js | TypeScript | Tailwind CSS
        </footer>
      </main>
    </>
  );
}





// 'use client';

// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import Script from 'next/script';
// import { motion } from 'framer-motion';
// import Projects from './projects/projects';

// const Shuffle = dynamic(() => import('./shuffle'), { ssr: false });
// const Links = dynamic(() => import('./links'), { ssr: false });
// const About = dynamic(() => import('./about'), { ssr: false });

// export default function Home() {
//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "Person",
//     "name": "Joseph McGarry",
//     "jobTitle": "Software Engineer",
//     "url": "https://josephmcgarry.dev/",
//     "sameAs": [
//       "https://www.linkedin.com/in/joseph-mcgarry",
//       "https://github.com/Joseph-McGarry"
//     ],
//     "image": "/joe.jpeg",
//     "description": "Full-stack software engineer specializing in React, Node.js, and building innovative projects."
//   };

//   return (
//     <>
//       {/* JSON-LD (app router-friendly) */}
//       <Script id="person-jsonld" type="application/ld+json">
//         {JSON.stringify(structuredData)}
//       </Script>

//       <main className="min-h-screen w-full flex flex-col items-center justify-center p-5 md:p-10 lg:p-10 space-y-8 md:space-y-12 lg:space-y-16">
//         {/* HERO */}
//         <header className="w-full max-w-screen-lg text-center">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
//             Joseph McGarry
//           </h1>

//           <p className="mt-3 text-sm md:text-base text-muted-foreground">
//             Software Engineer • RAG systems • Realtime UI • Agentic apps
//           </p>

//           {/* Accent line under keyword */}
//           <p className="mt-2 text-lg md:text-xl">
//             Building{" "}
//             <span className="relative inline-block">
//               <span className="text-accent">clean, fast experiences</span>
//               <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent blur-[1px]" />
//               <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent/60 blur-[4px]" />
//             </span>
//           </p>

//           {/* CTA row */}
//           <div className="mt-6 flex items-center justify-center gap-3">
//             <a
//               href="#projects"
//               className="inline-flex items-center rounded-xl bg-accent text-accent-fg px-4 py-2 text-sm font-medium shadow-neon
//                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
//             >
//               View projects
//             </a>
//             <a
//               href="/resume.pdf"
//               className="inline-flex items-center rounded-xl border border-white/10 px-4 py-2 text-sm
//                         hover:border-accent/60 hover:text-accent transition-colors
//                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
//             >
//               Download resume
//             </a>
//           </div>
//         </header>


//         {/* B/W IMAGE with vignette + grain + subtle motion */}
//         <motion.div
//           whileHover={{ scale: 1.02, rotate: 0.2 }}
//           transition={{ type: 'spring', stiffness: 220, damping: 14 }}
//           className="relative group rounded-2xl overflow-hidden"
//         >
//           <Image
//             src="/joe.jpeg"
//             alt="Joseph McGarry, Software Engineer"
//             width={900}
//             height={600}
//             priority
//             className="w-72 md:w-[28rem] lg:w-[32rem] h-auto rounded-2xl grayscale contrast-115"
//           />

//           {/* Vignette */}
//           <div
//             className="pointer-events-none absolute inset-0 opacity-90 group-hover:opacity-40 transition
//                        bg-[radial-gradient(ellipse_at_center,transparent_32%,black_100%)]"
//           />

//           {/* Grain (ensure /public/noise.png exists) */}
//           <div
//             className="pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay
//                        [background-image:url('/noise.png')] bg-repeat"
//           />
//           {/* Soft neon edge ring */}
//           <div className="pointer-events-none absolute inset-0 ring-1 ring-accent/15 rounded-2xl" />
//         </motion.div>

//         {/* ABOUT + SKILLS */}
//         <section className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl
//                     rounded-2xl border border-white/10 p-5 bg-card/50 backdrop-blur">
//           <div className="flex flex-col items-center md:items-start w-full md:w-1/2 min-h-[340px]">
//             <About />
//           </div>
//           <div className="flex flex-col items-center md:items-start w-full md:w-1/2 min-h-[340px]">
//             <Shuffle />
//           </div>
//         </section>

//         <h2 className="mb-4 text-xl md:text-2xl font-semibold tracking-tight">
//           <span className="relative">
//             PROJECTS
//             <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent/80 blur-[2px]" />
//           </span>
//         </h2>

//         {/* PROJECTS */}
//         <section id="projects" className="w-full max-w-screen-lg">
//           <Projects />
//         </section>

//         <h2 className="mb-4 text-xl md:text-2xl font-semibold tracking-tight">
//           <span className="relative">
//             LINKS
//             <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent/80 blur-[2px]" />
//           </span>
//         </h2>

//         {/* LINKS */}
//         <section className="w-full max-w-lg">
//           <Links />
//         </section>

//         <footer className="text-xs md:text-sm text-center mt-4 mb-2 text-muted-foreground">
//           © JOSEPH MCGARRY <br />
//           <span className="text-accent">Next.js</span> | TypeScript | Tailwind CSS
//         </footer>
//       </main>
//     </>
//   );
// }
