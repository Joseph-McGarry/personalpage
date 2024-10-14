'use client';

export default function About() {
  return (
    <div>
      <h1 className='text-2xl pl-4'>ABOUT ME</h1>
      <p className='pl-4 pt-5 pb-6'>
        Passionate full-stack Software Engineer, fluent in JavaScript, TypeScript and Python. Currently, working
        as an AI Contractor at DataAnnotation, enhancing the way humans interact with Artificial Intelligence. 
        <br></br>
        <br></br>
        When I&#39;m not behind a computer you can find me wandering the Blue Ridge Mountains, whipping something up in the kitchen or lounging with my cat Woofie.
        <br></br>
        <br></br>
        <a 
          className="cursor-default rounded text-md hover:text-lg hover:bg-gray-300 hover:shadow-two hover:text-black transition-shadow duration-100 ease-in-out"
          href="https://www.instagram.com/vulcanistileco/" 
          target="_blank" 
          rel="noopener noreferrer" 
        >
          Artist.
        </a>
      </p>
    </div>
  );
}
