import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Projects from './projects/projects';
// import Book from '../pages/book';

const Shuffle = dynamic(() => import('./shuffle'), {ssr: false});
const Links = dynamic(() => import('./links'), {ssr: false});
const About = dynamic(() => import('./about'), {ssr: false});
const RandomWalk = dynamic(() => import('./projects/randomwalk/randomwalk'), {ssr: false});

export default function Home() {
  const namePart1 = 'Joseph Mc';
  const namePart2 = 'arry';

  return (
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
      alt="joe"
      width={500}
      height={300}
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
        next.js | typescript | tailwind
      </footer>
    </main>
  );
}