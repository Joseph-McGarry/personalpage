'use client';

// import Image from "next/image";

// export default function About() {
//   return (
//     <div>
//       <p className='pl-4 pt-5'>
//         I work mainly in React/TypeScript and Node, with a focus on 
//         building software that feels simple to use and stays solid under the hood. I care about performance, maintainability, 
//         and shipping features that hold up in production.     
//         <br />
//         <br />
//         Recently, I&apos;ve worked on AI quality and reliability at DataAnnotation, 
//         improving model outputs through structured evaluation, debugging, 
//         and safety/truthfulness checks. I&apos;ve also built an open-source developer tool at OS Labs, BuQL,
//         a Redis-backed GraphQL caching layer that improved p95 performance 
//         and kept responses consistently fast.
//         <br />
//         <br />
//         When I&apos;m not behind a computer you can find me wandering the Blue Ridge Mountains, making art, or
//         firing up the grill.
//         <br />
//         <br />
//         Ask me about my cat{" "}
//         <span className="relative inline-block cursor-pointer text-pink-500 font-medium">
//           Woofie
//           <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-10 pointer-events-none">
//             <Image
//               src="/woofie.jpeg"
//               alt="Woofie the cat"
//               width={200}
//               height={200}
//               className="w-48 h-48 object-cover rounded-xl shadow-lg"
//             />
//           </span>
//         </span>
//         {"."}
//       </p>
//     </div>
//   );
// }

import Image from "next/image";
import { useState } from "react";

export default function About() {
  const [showWoofie, setShowWoofie] = useState(false);
  console.log("showWoofie:", showWoofie);

  return (
    <div>
      <p className='pl-4 pt-5'>
        I work mainly in React/TypeScript and Node, with a focus on 
        building software that feels simple to use and stays solid under the hood. I care about performance, maintainability, 
        and shipping features that hold up in production.     
        <br />
        <br />
        Recently, I&apos;ve worked on AI quality and reliability at DataAnnotation, 
        improving model outputs through structured evaluation, debugging, 
        and safety/truthfulness checks. I&apos;ve also built an open-source developer tool at OS Labs, BuQL,
        a Redis-backed GraphQL caching layer that improved p95 performance 
        and kept responses consistently fast.
        <br />
        <br />
        When I&apos;m not behind a computer you can find me wandering the Blue Ridge Mountains, making art, or
        firing up the grill.
        <br />
        <br />
        Ask me about my cat{" "}
        <span
          className="relative inline-block cursor-pointer text-pink-500 font-medium"
          onMouseEnter={() => setShowWoofie(true)}
          onMouseLeave={() => setShowWoofie(false)}
        >
          Woofie
          {showWoofie && (
            <span className="fixed bottom-0 right-0 z-50 pointer-events-none">
              <Image
                src="/woofie.jpeg"
                alt="Woofie the cat"
                width={200}
                height={200}
                className="w-48 h-48 object-cover rounded-xl shadow-lg grayscale"
              />
            </span>
          )}
        </span>
        {"."}
      </p>
    </div>
  );
}