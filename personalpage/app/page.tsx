import Link from 'next/link';
// import Book from '../pages/book';

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
      <h1 className="text-xl">skills = </h1>
        <p style={{paddingLeft: '70px'}} className='w-[450px] p-5'>
          [ Javascript, TypeScript, React, Next.js, Node, Express, MongoDB, Mongoose, Python, HTML, CSS, SCSS, Tailwind, AJAX, Bun, PostgreSQL, GraphQL, Redis, Vite, Webpack, Jest, Supertest, React Testing Library, TypeScript, Redux, ReduxToolKit, CI/CD, AWS, Docker, Git, Github Actions ]
        </p>
      </div>
      <div>
        <h1 className='text-xl'>links</h1>
        <div className='text-sm w-20 m-2 rounded flex text-center hover:shadow-white hover:black p-2 transition-shadow duration-300 ease-in-out'>
          <a href="https://github.com/Joseph-McGarry?tab=repositories" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div className='text-sm w-20 m-2 rounded flex text-center hover:shadow-white hover:black p-2 transition-shadow duration-300 ease-in-out'>
          <a href="https://www.linkedin.com/in/joseph-mcgarry" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className='text-sm w-20 m-2 rounded flex text-center hover:shadow-white hover:black p-2 transition-shadow duration-300 ease-in-out'>
          <a href="https://medium.com/@dylan.e.briar/looking-for-a-graphql-caching-solution-in-bun-its-time-to-buql-up-b2742f07847f" target="_blank" rel="noopener noreferrer">Medium</a>
        </div>
      </div>
    </main>
  );
}