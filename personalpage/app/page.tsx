import Link from 'next/link';
// import Book from '../pages/book';

export default function Home() {
  // Split the name to isolate the "g" for styling as a button
  const namePart1 = 'joseph mc';
  const namePart2 = 'arry';

  return (
    <main className="flex min-h-screen flex-col items-left justify-around p-14">
      <h1 className="text-xl">
        {namePart1}
        {/* Using Link component directly without <a> */}
        <Link href="/book" passHref>
          {/* Styling applied directly to Link. The 'g' is now part of the Link component */}
          <span className="cursor-pointer hover:text-black" style={{outline: 'none'}}>
            g
          </span>
        </Link>
        {namePart2}
      </h1>
      <p>*insert image*</p>
      <p>about me</p>
      <p>skills</p>
    </main>
  );
}