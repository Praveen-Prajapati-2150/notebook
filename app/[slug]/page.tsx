'use client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import TextArea from '../components/textArea';
import debounce from '../utils/debounce';

export default function DynamicPage() {
  const params = useParams();
  const slug: string = params.slug as string; // Explicitly assert type

  const [text, setText] = useState<string>('');
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const saveToLocalStorage = (value: string) => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '{}');
    savedNotes[slug] = value;
    localStorage.setItem('notes', JSON.stringify(savedNotes));
  };

  const debouncedSaveToLocalStorage = debounce(saveToLocalStorage, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    debouncedSaveToLocalStorage(newValue);
  };

  let data: {
    page1: 'data';
    page2: 'data';
    page3: 'data';
  };

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '{}');

    if (savedNotes[slug]) {
      setText(savedNotes[slug]);
    } else {
      savedNotes[slug] = '';
      localStorage.setItem('notes', JSON.stringify(savedNotes));
    }
  }, [slug]);

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] px-5 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p style={{ width: '40%' }} className="text-xl mt-4 mb-5">
        <span className="text-blue-500">{slug}</span>
      </p>
      <TextArea text={text} handleChange={handleChange} />
    </div>
  );
}
