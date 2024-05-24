import Link from 'next/link';
import dynamic from 'next/dynamic';
// import Book from '../pages/book';

const Shuffle = dynamic(() => import('./shuffle'), {ssr: false});
const Links = dynamic(() => import('./links'), {ssr: false});
const About = dynamic(() => import('./about'), {ssr: false});

export default function Home() {
  const namePart1 = 'joseph mc';
  const namePart2 = 'arry';

  return (
    <main className="min-h-screen min-w-screen grid grid-cols-1 md:grid-cols-3 place-items-center px-5 md:px-10 lg:px-20">
      <div className="flex flex-col items-center text-center space-y-4">
        <header>
          <h1 className="text-3xl md:text-5xl lg:text-5xl">
            {namePart1}
            <Link href="/book" passHref>
              <span className="cursor-default hover:text-black" style={{outline: 'none'}}>
                g
              </span>
            </Link>
            {namePart2}
          </h1>
        </header>
        
        <img src="/test.jpg" alt="test" className="w-68 md:w-96 h-auto"></img>
        
      </div>
      <div className="mt-2 sm:mt-4 md:mt-4 lg:mt-4 xl:mt-10 flex flex-col items-center space-y-4 pt-6">
        <About />
      </div>

      <div className="mt-2 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-10 flex flex-col items-center space-y-4 pt-6">
        <Shuffle />
      </div>

      <div className="flex flex-col items-center space-y-4 pt-6">
      </div>

      <div className="flex flex-col items-center">
        <Links />
      </div>

      <footer className="col-span-full text-sm md:text-base lg:text-base text-center mt-8 mb-4">
        © joseph mcgarry <br />
        next.js | typescript | tailwind css 
      </footer>
    </main>
  );
}