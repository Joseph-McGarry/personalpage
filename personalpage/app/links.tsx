'use client';

export default function Links() {

return (
    <div className='p-2 border-2 border-white rounded w-80 md:w-96 lg:w-96 h-auto' >
        <h1 className='text-2xl pt-4'>LINKS</h1>
        {/* <div className="text-center items-center grid grid-cols-2 md:grid-cols-3 gap-x-1"> */}
        <div className="grid grid-cols-3 gap-x-1 place-items-center">
            <div  className='m-2'>
                <a href="https://github.com/Joseph-McGarry" target="_blank" rel="noopener noreferrer" className='cursor-default block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
                GitHub
                </a>
            </div>
            <div  className='m-2'>
                <a href="https://www.linkedin.com/in/joseph-mcgarry" target="_blank" rel="noopener noreferrer" className='cursor-default block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
                LinkedIn
                </a>
            </div>
            <div className='m-2'>
                <a href="https://buql.dev" target="_blank" rel="noopener noreferrer" className='cursor-default block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
                BuQL
                </a>
            </div>
            <div className='m-2'>
                <a href="https://medium.com/@dylan.e.briar/looking-for-a-graphql-caching-solution-in-bun-its-time-to-buql-up-b2742f07847f" target="_blank" rel="noopener noreferrer" className='cursor-default block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
                Medium
                </a>
            </div>
            <div className='m-2'>
                <a href="https://www.npmjs.com/package/@buql/buql" target="_blank" rel="noopener noreferrer" className='cursor-default block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
                npm
                </a>
            </div>
            <div className='m-2'>
                <a href="https://www.youtube.com/watch?v=0uBBJrszzUE&t=5s" target="_blank" rel="noopener noreferrer" className='cursor-default block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
                YouTube
                </a>
            </div>
        </div>
    </div>
    )
}