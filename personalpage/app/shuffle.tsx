
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialSkills = [
  'Javascript', 'TypeScript', 'React', 'Next.js', 'Node', 'Express', 'MongoDB',
  'Mongoose', 'Python', 'HTML', 'CSS', 'SCSS', 'Tailwind', 'AJAX', 'Bun',
  'PostgreSQL', 'GraphQL', 'Redis', 'Vite', 'Webpack', 'Jest', 'Supertest',
  'TypeScript', 'Redux', 'ReduxToolKit', 'CI/CD', 'AWS',
  'Docker', 'Git', 'Github Actions']

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
    <div>
      <button className="text-xl cursor-default" onClick={handleSkillsClick}>skills</button>
      <div className="mt-1" style={{paddingLeft: '70px'}}>
        <div className="w-[425px] bg-black rounded-lg"style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <AnimatePresence>
            {skills.map((skill) => (
              <motion.div
                key={skill.id} // Use the unique id for key
                initial={hasMounted ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: transitionDuration }}
                layout
                // className="p-2"
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
