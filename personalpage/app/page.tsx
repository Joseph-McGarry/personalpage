import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import Book from '../pages/book';

const Shuffle = dynamic(() => import('./shuffle'), {ssr: false});
const Links = dynamic(() => import('./links'), {ssr: false});
const About = dynamic(() => import('./about'), {ssr: false});

export default function Home() {
  const namePart1 = 'Joseph Mc';
  const namePart2 = 'arry';

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-5 md:p-10 lg:p-20 space-y-10">
      {/* Top Section (Name and Image) */}
      <div className="flex flex-col items-center text-center w-full max-w-lg p-5">
        <header>
          <h1 className="mb-4 text-4xl md:text-5xl lg:text-5xl">
            {namePart1}
            <Link href="/book" passHref>
              <span className="cursor-default hover:text-black" style={{ outline: 'none' }}>
                G
              </span>
            </Link>
            {namePart2}
          </h1>
        </header>
        <Image
          src="/test.jpg"
          alt="test"
          width={500}  // specify width
          height={300} // specify height
          className="w-64 md:w-96 lg:w-128 h-auto"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-5 w-full max-w-5xl rounded border-2 border-white p-5">
        {/* About Me Section */}
        <div className="flex flex-col items-center justify-center text-left w-full md:w-1/2 min-h-[400px] h-full">
          <About />
        </div>

        {/* Skills Section */}
        <div className="flex flex-col items-center justify-center text-left w-full md:w-1/2 min-h-[400px] h-full">
          <Shuffle />
        </div>
      </div>


      {/* Bottom Section (Links) */}
      <div className="flex flex-col items-center justify-center text-center w-full max-w-lg">
        <Links />
      </div>

      <footer className="text-sm md:text-base lg:text-base text-center mt-8 mb-4">
        © JOSEPH MCGARRY <br />
        next.js | typescript | tailwind css 
      </footer>
    </main>
  );
}