import Link from 'next/link';
import dynamic from 'next/dynamic';
// import Book from '../pages/book';

const Shuffle = dynamic(() => import('./shuffle'), {ssr: false});

export default function Home() {
  // Split the name to isolate the "g" for styling as a button
  const namePart1 = 'joseph mc';
  const namePart2 = 'arry';

  return (
    <main className="flex min-h-screen min-w-screen flex-col items-left justify-around p-10">
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
        <p className='w-84 pl-5 pt-5 pb-5'>
        passionate software engineer.<br></br>
        UI/UX obsessed. <br></br>
        asheville, nc. <br></br>
        full-stack.<br></br>
         <br></br>
         <a className="cursor-default hover:text-black" href="https://www.instagram.com/vulcanistileco/" target="_blank" rel="noopener noreferrer">artist.</a>
        </p>
      </div>
      <div>
        <Shuffle />
      </div>
      <div >
        <h1 className='mt-10 text-xl'>links</h1>
        {/* <div className="grid grid-cols-4 gap-x-6 w-80"> */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 w-80">
          <div  className='m-2'>
            <a href="https://github.com/Joseph-McGarry" target="_blank" rel="noopener noreferrer" className='cursor-default block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
              GitHub
            </a>
          </div>
          <div style={{paddingLeft: '0px'}} className='m-2'>
            <a href="https://www.linkedin.com/in/joseph-mcgarry" target="_blank" rel="noopener noreferrer" className='cursor-default block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
              LinkedIn
            </a>
          </div><div style={{paddingLeft: '0px'}} className='m-2'>
            <a href="https://buql.dev" target="_blank" rel="noopener noreferrer" className='cursor-default block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
              BuQL
            </a>
          </div>
          <div style={{paddingLeft: '0px'}} className='m-2'>
            <a href="https://medium.com/@dylan.e.briar/looking-for-a-graphql-caching-solution-in-bun-its-time-to-buql-up-b2742f07847f" target="_blank" rel="noopener noreferrer" className='cursor-default block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
              Medium
            </a>
          </div>
          <div style={{paddingLeft: '0px'}} className='m-2'>
            <a href="https://www.npmjs.com/package/@buql/buql" target="_blank" rel="noopener noreferrer" className='cursor-default block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
              npm
            </a>
          </div>
          <div style={{paddingLeft: '0px'}} className='m-2'>
            <a href="https://www.youtube.com/watch?v=0uBBJrszzUE&t=5s" target="_blank" rel="noopener noreferrer" className='cursor-default block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
              YouTube
            </a>
          </div>
        </div>
      </div>
        <div>
          <p className='text-xs pt-16 pl-0'>
          © joseph mcgarry <br></br>
          <br></br>
          next.js | typescript | tailwind css 
          </p>
        </div>
    </main>
  );
}