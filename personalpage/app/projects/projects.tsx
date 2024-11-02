'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Projects() {

return (
    <div className='p-2 border-2 border-white rounded w-80 md:w-96 lg:w-96 h-auto' >
        <h1 className='text-2xl pt-4'>PROJECTS</h1>
        {/* <div className="text-center items-center grid grid-cols-2 md:grid-cols-3 gap-x-1"> */}
        <div className="grid grid-cols-2 gap-x-1 place-items-center">
            <div  className='m-2'>
                <Link href="/projects/randomwalk" passHref>
                    {/* <span className='cursor-default block text-sm w-20 pl-1 pr-1 pt-2 pb-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
                    Abstractify
                    </span> */}
                    <Image
                        src="/Abstractify.png"
                        alt="abstractify preview"
                        width={500}  // specify width
                        height={300} // specify height
                        className=" mt-4 w-64 md:w-96 lg:w-128 h-auto"
                        />
                </Link>
            </div>
            {/* <div  className='m-2'>
                <a href="" target="_blank" rel="noopener noreferrer" className='cursor-default block text-sm w-20 p-2 rounded text-center hover:shadow-white hover:bg-black transition-shadow duration-300 ease-in-out'>
                Soupfeld
                </a>
            </div>*/}
            <div className='m-2'>
                <Link href="/projects/tessellations" passHref>
                    <Image
                        src="/tessellationScreenshot.png"
                        alt="tessellator preview"
                        width={500}  // specify width
                        height={300} // specify height
                        className=" mt-4 w-64 md:w-96 lg:w-128 h-auto"
                        />
                </Link>
            </div> 
        </div>
    </div>
    )
}