
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialSkills = [
  'javascript', 'typescript', 'react', 'next.js', 'node', 'express', 'mongodb',
  'mongoose', 'python', 'html', 'css', 'scss', 'tailwind', 'ajax', 'bun', 'graphql',
  'redis','postgresql', 'vite', 'webpack', 'jest', 'supertest',
  'redux', 'redux toolkit', 'ci/cd', 'aws',
  'docker', 'github', 'git' ]

export default function Shuffle() {
  const [skills, setSkills] = useState(initialSkills.map((skill, index) => ({
    id: `${skill}-${index}`, // Create a unique id for each skill
    name: skill,
  })));
  const [hasMounted, setHasMounted] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(0.5);

  useEffect(() => {
    setHasMounted(true); // Set to true once the component has mounted
  }, []);


  const shuffleSkills = (array: any[]) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const handleSkillsClick = () => {
    // Create a copy of the skills array to shuffle
    setSkills(shuffleSkills([...skills]));
    const randomDuration = Math.random() * (5 - 1) + 1;
    setTransitionDuration(randomDuration);
  };

  return (
    <div className='p-2 border-2 border-white rounded w-68 md:w-96 lg:w-96 h-auto'>
      <button className="pl-3 text-2xl  cursor-default hover:text-black" onClick={handleSkillsClick}>skills</button>
      <div>
        {/* <div className="max-w-[450px] w-full bg-black rounded-lg px-0 py-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.25rem' }}> */}
        {/* <div className="max-w-[450px] w-full bg-black rounded-lg px-0 py-2 grid grid-cols-2 sm:grid-cols-3 gap-1"> */}
        <div className="pt-5 pl-4 pb-5 text-md md:text-md bg-black rounded-lg px-0 py-2 grid grid-cols-3 gap-1.5 place-items-">
          <AnimatePresence>
            {skills.map((skill) => (
              <motion.div
                key={skill.id} // Use the unique id for key
                initial={hasMounted ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: transitionDuration }}
                layout
              >
                {skill.name}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
