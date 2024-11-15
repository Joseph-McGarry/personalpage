'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Projects() {


    return (
        <div className="p-2 border-2 border-white rounded w-full max-w-[1600px] mx-auto h-auto">
          <h1 className="text-2xl pt-4">PROJECTS</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 place-items-center">
            {/* Project 1 */}
            <div className="m-2">
              <Link href="/projects/randomwalk" passHref>
                <Image
                  src="/Abstractify.png"
                  alt="abstractify preview"
                  width={500}
                  height={300}
                  className="mt-4 w-full h-auto object-cover"
                />
              </Link>
              <p className="mt-4 text-center">
              Interactive tool for generating abstract art using the principles of Random Walk mathematics, designed to inspire creativity through computational patterns.
              </p>
            </div>
            {/* Project 2 */}
            {/* <div className="m-2">
              <Link href="/projects/soupfeld" passHref>
                <Image
                  src="/soup2.png"
                  alt="soup preview"
                  width={500}
                  height={300}
                  className="mt-4 w-full h-auto object-cover"
                />
              </Link>
              <p className="mt-4 text-center">
                Seinfeld-themed random soup generator integrating the OpenAI API to produce unique, character-inspired recipes with a touch of humor and creativity.
              </p>
            </div> */}
            {/* Project 3 */}
            <div className="m-2">
              <Link href="/projects/tessellations" passHref>
                <Image
                  src="/tessellationScreenshot.png"
                  alt="tessellator preview"
                  width={500}
                  height={300}
                  className="mt-4 w-full h-auto object-cover"
                />
              </Link>
              <p className="mt-4 text-center">
                An interactive tessellation design tool that enables users to explore and create intricate, visually captivating geometric patterns.
              </p>
            </div>
          </div>
        </div>
      ); 
}