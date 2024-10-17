'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialSkills = [
  'javascript', 'typescript', 'react', 'next.js', 'node', 'express', 'mongodb',
  'mongoose', 'python', 'html', 'css', 'scss', 'tailwind', 'ajax', 'bun', 'graphql',
  'redis', 'postgresql', 'vite', 'webpack', 'jest', 'supertest',
  'redux', 'redux toolkit', 'ci/cd', 'aws', 'docker', 'github', 'git'
];

export default function Shuffle() {
  const [skills, setSkills] = useState(initialSkills.map((skill, index) => ({
    id: `${skill}-${index}`, // Create a unique id for each skill
    name: skill,
  })));
  const [transitionDuration, setTransitionDuration] = useState(0.5);
  const intervalRef = useRef<any>(null); // To store the interval ID

  // Shuffle function
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

  // Start the automatic shuffling
  const startShuffling = () => {
    intervalRef.current = setInterval(() => {
      setSkills(shuffleSkills([...skills]));
      // const randomDuration = Math.random() * (5 - 1) + 1;
      const duration = 7;
      setTransitionDuration(duration);
    }, 7000); // Shuffle every second
  };

  // Stop the automatic shuffling
  const stopShuffling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval to stop shuffling
    }
  };

  // Start shuffling when component mounts
  useEffect(() => {
    startShuffling(); // Start shuffling on mount
    return () => stopShuffling(); // Cleanup on unmount
  }, []);

  return (
    <div
      className='container flex justify-center items-center p-2 border-2 rounded w-80 lg:w-96 h-auto'
      onMouseEnter={stopShuffling}   // Stop shuffling on hover
      onMouseLeave={startShuffling}  // Resume shuffling when mouse leaves
    >
      <div className="pt-5 pl-1 pb-5 text-md md:text-md bg-black rounded-lg px-0 py-2 grid grid-cols-3 gap-1.5">
        <AnimatePresence>
          {skills.map((skill) => (
            <motion.div
              key={skill.id} // Use the unique id for key
              initial={{ opacity: 0, y: 20 }}
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
  );
}
