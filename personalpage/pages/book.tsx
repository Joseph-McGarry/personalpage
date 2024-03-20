import React, { useState, useRef } from 'react';

export default function Book() {
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState([]); // To store guestbook entries
  const [names, setNames] = useState([]);
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPending(true);

    // Extract the message and name from the form
    const formData = new FormData(formRef.current);
    const message = formData.get('entry');
    const name = formData.get('name');

    // Fake submission delay
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, message]);
      setNames(prevNames => [...prevNames, name]);
      setPending(false);
    }, 100);

    // Clear the form
    formRef.current.reset();
  };

  return (
    <div className="flex min-h-screen flex-col items-left justify-around p-14">
      <h1>Guestbook</h1>
      <form
        style={{ opacity: !pending ? 1 : 0.7 }}
        className="relative max-w-[500px]"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <input
          aria-label="name"
          placeholder="Alias"
          disabled={pending}
          name="name"
          type="text"
          required
          className="pl-4 pr-32 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-neutral-300 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
        />
        <input
          aria-label="message"
          placeholder="Piece of mind"
          disabled={pending}
          name="entry"
          type="text"
          required
          className="pl-4 pr-32 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-neutral-300 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
        />
        <button
          className="flex items-center justify-center absolute right-1 top-1 px-2 py-1 font-medium h-8 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded w-16"
          disabled={pending}
          type="submit"
        >
          Sign
        </button>
      </form>
      <div className="mt-6">
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="my-2 p-2 bg-gray-200 dark:bg-neutral-700 rounded">
              {msg}
            </li>
          ))}
        </ul>
        <ul>
          {names.map((alias, index) => (
            <li key={index} className="my-2 p-2 bg-gray-200 dark:bg-neutral-700 rounded">
              {alias}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}