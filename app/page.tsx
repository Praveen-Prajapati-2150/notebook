'use client';
import React, { useEffect, useRef, useState } from 'react';
import TextArea from './components/textArea';
import debounce from './utils/debounce';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [text, setText] = useState<string>('');
  const [pagesTab, setPagesTab] = useState<string[]>([]);
  const router = useRouter();

  const handleRedirect = (item: String) => {
    router.push(item as string); // Replace with your desired path
  };

  const saveToLocalStorage = (value: string) => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '{}');
    savedNotes['home'] = value;
    localStorage.setItem('notes', JSON.stringify(savedNotes));
  };

  const debouncedSaveToLocalStorage = debounce(saveToLocalStorage, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    debouncedSaveToLocalStorage(newValue);
  };

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '{}');

    const keys = Object.keys(savedNotes) || [];
    setPagesTab(keys);

    if (savedNotes['home']) {
      setText(savedNotes['home']);
    } else {
      savedNotes['home'] = '';
      localStorage.setItem('notes', JSON.stringify(savedNotes));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center justify-start w-[100%] ">
        {pagesTab?.map((item) => (
          <p
            onClick={() => handleRedirect(item)}
            className="mr-5 cursor-pointer"
          >
            {item}
          </p>
        ))}
      </div>
      <TextArea text={text} handleChange={handleChange} />
    </div>
  );
}
