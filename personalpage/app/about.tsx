'use client';

export default function About() {

return (
    <div className='text-left border-2 border-white p-2 rounded w-68 md:w-96 lg:w-96 h-auto'>
          <h1 className='text-2xl pl-4'>about me</h1>
          <p className='pl-4 pt-5 pb-6'>
          passionate full-stack software engineer living in asheville, nc. 
          working primarily in javascript with an emphasis in react, node.js and express.js.
          i love building products and developing new features.
          <br></br>
          <br></br>
          when i am not behind a computer you can find me wandering the blue ridge mountains, whipping something up in the kitchen or lounging with my cat woofie.
          <br></br>
          <br></br>
          <a className="cursor-default hover:text-black" href="https://www.instagram.com/vulcanistileco/" target="_blank" rel="noopener noreferrer">artist.</a>
          </p>
        </div>
    );
};