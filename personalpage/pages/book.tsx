import React, { useState, useRef, useEffect } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { metadata } from '@/app/layout';
import "../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function Book() {
  const [pending, setPending] = useState(false);
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');
  const messageRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.style.height = 'auto';
      messageRef.current.style.height = `${messageRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPending(true);

    // Extract the message and name directly from state and ref
    const name = nameRef.current.value;
    
    // Combine the name and message into one entry
    const newEntry = { name, message };

    // Add the new entry to the existing list of entries
    setEntries((prevEntries) => [...prevEntries, newEntry]);

    // Clear the form fields
    setMessage('');
    nameRef.current.value = '';

    setPending(false);
  };

  return (
    <div className="flex min-h-screen flex-col text-start items-left justify-start p-14">
      <h1 className='text-xl mb-10'>speak your mind...</h1>
      <form
        className="relative max-w-[500px]"
        style={{ opacity: !pending ? 1 : 0.7 }}
        onSubmit={handleSubmit}
      >
        <input
          ref={nameRef}
          aria-label="name"
          placeholder="name"
          disabled={pending}
          name="name"
          type="text"
          maxLength={30}
          required
          className=" pl-2 pr-32 py-2 mb-2 hover:shadow-white block w-full border-neutral-300 rounded-md bg-black transition-shadow duration-500 ease-in-out'"
        />
        <textarea
          ref={messageRef}
          aria-label="message"
          placeholder="message"
          disabled={pending}
          name="entry"
          maxLength={255}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none pl-2 pr-32 py-2 mt-3 hover:shadow-white block w-full border-neutral-300 rounded-md bg-black transition-shadow duration-500 ease-in-out'"
        />
        <button
          className='mt-2 block text-sm w-20 p-2 rounded text-start hover:shadow-white hover:bg-black transition-shadow duration-500 ease-in-out'
          disabled={pending}
          type="submit"
        >
          sign
        </button>
      </form>
      <div className="mt-20">
        <h2>recorded</h2>
        <ul>
          {entries.map((entry, index) => (
            <li key={index} className="m-5 my-2 p-2 bg-gray-200 dark:bg-neutral-700 rounded">
              {entry.name}: {entry.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}