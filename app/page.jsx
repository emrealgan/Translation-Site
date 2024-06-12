"use client"
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { requireAuthentication } from '@/app/lib/auth';

const languages = [
  { code: 'ar', name: 'Arapça' },
  { code: 'az', name: 'Azerice' },
  { code: 'de', name: 'Almanca' },
  { code: 'en', name: 'İngilizce' },
  { code: 'fa', name: 'Farsça' },
  { code: 'fr', name: 'Fransızca' },
  { code: 'ja', name: 'Japonca' },
  { code: 'nl', name: 'Hollandaca' },
  { code: 'no', name: 'Norveççe' },
  { code: 'uz', name: 'Özbekçe' },
  { code: 'so', name: 'Somalice' },
  { code: 'tr', name: 'Türkçe' },
];

export default function Home() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState(languages[3].code);
  const [targetLanguage, setTargetLanguage] = useState(languages[11].code);

  const handleTranslate = async () => {
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, sourceLanguage, targetLanguage }),
      });

      if (!res.ok) {
        console.error('Error from translate API:', res.statusText);
        setTranslatedText('Translation failed');
        return;
      }

      const data = await res.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('Error in handleTranslate:', error);
      setTranslatedText('Translation failed');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Tevhidî Mütercim</h1>
      <textarea
        className="w-full p-2 border"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex mt-2">
        <select
          className="w-1/2 p-2 border mr-2"
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <select
          className="w-1/2 p-2 border"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="mt-2 p-2 bg-blue-500 text-white"
        onClick={handleTranslate}
      >
        Çevir
      </button>
      {translatedText && (
        <div className="mt-4 p-2 border">
          <h2 className="text-xl">Çeviri Sonucu:</h2>
          <p>{translatedText}</p>
        </div>
      )}
      <button
        className="mt-2 p-2 bg-red-500 text-white"
        onClick={() => signOut({ callbackUrl: '/login' })}
      >
        Logout
      </button>
    </div>
  );
}

export { requireAuthentication as getServerSideProps };
