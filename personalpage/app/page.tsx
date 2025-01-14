// import Link from 'next/link';
// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import Projects from './projects/projects';
// // import Book from '../pages/book';

// const Shuffle = dynamic(() => import('./shuffle'), {ssr: false});
// const Links = dynamic(() => import('./links'), {ssr: false});
// const About = dynamic(() => import('./about'), {ssr: false});
// const RandomWalk = dynamic(() => import('./projects/randomwalk/randomwalk'), {ssr: false});

// export default function Home() {
//   const namePart1 = 'Joseph Mc';
//   const namePart2 = 'arry';

//   return (
//     <main className="min-h-screen w-full flex flex-col items-center justify-center p-5 md:p-10 lg:p-10 space-y-2 sm:space-y-3 md:space-y-5 lg:space-y-10">
//     {/* Top Section (Name and Image) */}
//     <div className="flex flex-col items-center text-center w-full max-w-lg">
//       <header>
//         <h1 className="text-4xl md:text-5xl lg:text-5xl">
//           {namePart1}
//           <Link href="/book" passHref>
//             <span className="cursor-default hover:text-black" style={{ outline: 'none' }}>
//               G
//             </span>
//           </Link>
//           {namePart2}
//         </h1>
//       </header>
//     </div>
//     <Image
//       src="/joe.jpeg"
//       alt="joe"
//       width={500}
//       height={300}
//       className="w-72 md:w-[28rem] lg:w-[32rem] h-auto"
//     />
    
//     <div className="flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-5 w-full max-w-5xl rounded border-2 border-white p-5">
//       {/* About Me Section */}
//       <div className="flex flex-col items-center justify-center text-left w-full md:w-1/2 min-h-[400px] h-full">
//         <About />
//       </div>

//       {/* Skills Section */}
//       <div className="flex flex-col items-center justify-center text-left w-full md:w-1/2 min-h-[350px] h-full">
//         <Shuffle />
//       </div>
//     </div>

//     {/* Project Section */}
//     <div className="flex flex-col items-center justify-center text-center w-full max-w-screen-lg">
//       <Projects />
//     </div>

//     <div className="flex flex-col items-center justify-center text-center w-full max-w-lg">
//       <Links />
//     </div>
//       <footer className="text-sm md:text-base lg:text-base text-center mt-8 mb-4">
//         © JOSEPH MCGARRY <br />
//         Next.js | TypeScript | Tailwind CSS
//       </footer>
//     </main>
//   );
// }

import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Projects from './projects/projects';
import Head from 'next/head';

const Shuffle = dynamic(() => import('./shuffle'), { ssr: false });
const Links = dynamic(() => import('./links'), { ssr: false });
const About = dynamic(() => import('./about'), { ssr: false });

export default function Home() {
  const namePart1 = 'Joseph Mc';
  const namePart2 = 'arry';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Joseph McGarry",
    "jobTitle": "Software Engineer",
    "url": "https://josephmcgarry.dev/",
    "sameAs": [
      "https://www.linkedin.com/in/joseph-mcgarry",
      "https://github.com/Joseph-McGarry"
    ],
    "image": "/joe.jpeg",
    "description": "Full-stack software engineer specializing in React, Node.js, and building innovative projects.",
  };

  return (
    <>
      <Head>
        <title>Joseph McGarry - Software Engineer</title>
        <meta name="description" content="Portfolio of Joseph McGarry, a passionate full-stack software engineer specializing in React, Node.js, and modern web technologies." />
        <meta name="keywords" content="Joseph McGarry, Software Engineer, React, Node.js, Portfolio, Web Development, Full-Stack" />
        <meta name="author" content="Joseph McGarry" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Joseph McGarry - Software Engineer" />
        <meta property="og:description" content="Explore Joseph McGarry's portfolio, showcasing skills, projects, and expertise in modern web development." />
        <meta property="og:image" content="/joe.jpeg" />
        <meta property="og:url" content="https://josephmcgarry.dev/" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://josephmcgarry.dev/" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <main className="min-h-screen w-full flex flex-col items-center justify-center p-5 md:p-10 lg:p-10 space-y-2 sm:space-y-3 md:space-y-5 lg:space-y-10">
        {/* Top Section (Name and Image) */}
        <div className="flex flex-col items-center text-center w-full max-w-lg">
          <header>
            <h1 className="text-4xl md:text-5xl lg:text-5xl">
              {namePart1}
              <Link href="/book" passHref>
                <span className="cursor-default hover:text-black" style={{ outline: 'none' }}>
                  G
                </span>
              </Link>
              {namePart2}
            </h1>
          </header>
        </div>
        <Image
          src="/joe.jpeg"
          alt="Joseph McGarry, Software Engineer"
          width={500}
          height={300}
          priority
          className="w-72 md:w-[28rem] lg:w-[32rem] h-auto"
        />
        <div className="flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-5 w-full max-w-5xl rounded border-2 border-white p-5">
          {/* About Me Section */}
          <div className="flex flex-col items-center justify-center text-left w-full md:w-1/2 min-h-[400px] h-full">
            <About />
          </div>

          {/* Skills Section */}
          <div className="flex flex-col items-center justify-center text-left w-full md:w-1/2 min-h-[350px] h-full">
            <Shuffle />
          </div>
        </div>

        {/* Project Section */}
        <div className="flex flex-col items-center justify-center text-center w-full max-w-screen-lg">
          <Projects />
        </div>

        <div className="flex flex-col items-center justify-center text-center w-full max-w-lg">
          <Links />
        </div>

        <footer className="text-sm md:text-base lg:text-base text-center mt-8 mb-4">
          © JOSEPH MCGARRY <br />
          Next.js | TypeScript | Tailwind CSS
        </footer>
      </main>
    </>
  );
}
