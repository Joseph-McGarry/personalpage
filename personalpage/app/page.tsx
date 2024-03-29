import Link from 'next/link';
import dynamic from 'next/dynamic';
// import Book from '../pages/book';

const Shuffle = dynamic(() => import('./shuffle'), {ssr: false});

export default function Home() {
  // Split the name to isolate the "g" for styling as a button
  const namePart1 = 'joseph mc';
  const namePart2 = 'arry';

  return (
    <main className="flex min-h-screen flex-col items-left justify-around p-14">
      <h1 className="text-3xl">
        {namePart1}
        {/* Using Link component directly without <a> */}
        <Link href="/book" passHref>
          {/* Styling applied directly to Link. The 'g' is now part of the Link component */}
          <span className="cursor-default hover:text-black" style={{outline: 'none'}}>
            g
          </span>
        </Link>
        {namePart2}
      </h1>
      <img src="/test.jpg" alt="test" className='w-64 h-auto pt-7 pb-5'></img>
      <div>
        <h1 className='text-xl'>about me</h1>
        <p className='p-5'>
        passionate software engineer.<br></br>
        frontend + backend. <br></br>
         <br></br>
         <br></br>
         <a className="cursor-default" href="https://www.instagram.com/vulcanistileco/" target="_blank" rel="noopener noreferrer">artist.</a>
        </p>
      </div>
      <div>
        <Shuffle />
      </div>
      <div>
        <h1 className='mt-10 text-xl'>links</h1>
        <div  className='m-2 cursor-default'>
          <a href="https://github.com/Joseph-McGarry?tab=repositories" target="_blank" rel="noopener noreferrer" className='block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
            GitHub
          </a>
        </div>
        <div style={{paddingLeft: '0px'}} className='m-2 cursor-default'>
          <a href="https://www.linkedin.com/in/joseph-mcgarry" target="_blank" rel="noopener noreferrer" className='block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
            LinkedIn
          </a>
        </div>
        <div style={{paddingLeft: '0px'}} className='m-2 cursor-default'>
          <a href="https://medium.com/@dylan.e.briar/looking-for-a-graphql-caching-solution-in-bun-its-time-to-buql-up-b2742f07847f" target="_blank" rel="noopener noreferrer" className='block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
            Medium
          </a>
        </div>
      </div>
        <div>
          <p className='text-xs pt-16 pl-10'>
          © joseph mcgarry | next.js | typescript | tailwind.css | mongodb
          </p>
        </div>
    </main>
  );
}