"use client"
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const languages = [
  { code: 'ar', name: 'العربية' }, // Arapça
  { code: 'az', name: 'Azeri' },  
  { code: 'de', name: 'Deutsch' }, // Almanca
  { code: 'en', name: 'English' }, 
  { code: 'fa', name: 'فارسی' }, // Farsça
  { code: 'fr', name: 'Français' }, 
  { code: 'ja', name: '日本語' }, // Japonca
  { code: 'nl', name: 'Nederlands' }, // Felemenkçe
  { code: 'no', name: 'Norsk' }, // Norveççe
  { code: 'uz', name: 'Oʻzbekcha' },  
  { code: 'so', name: 'Soomaali' }, 
  { code: 'tr', name: 'Türkçe' }  
];

export default function Home() {
  const { data: session, status } = useSession();
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState(languages[3].code);
  const [targetLanguage, setTargetLanguage] = useState(languages[11].code);

  if (status === "loading") {
    return ( <div>Loading...</div> );
  }
  if (!session) {
    return (<div>You are not authenticated.</div>);
  }
  const mail = session.user.email;
  const provider = session.user.provider;

  const handleTranslate = async () => {
    setTranslatedText('⏳');
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, sourceLanguage, targetLanguage, mail, provider }),
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
  console.log(provider)

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center p-2">
        <h1 className="text-2xl font-bold">Mütercim</h1>
        <div className="flex space-x-4 items-center">
          <Link
            href="/history"
            className="text-center h-10 w-28 bg-green-500 text-white rounded-md text-sm"
          >
            Translation History
          </Link>
          <button
            className="text-center h-10 w-20 bg-red-500 text-white rounded-md text-sm"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </div>

      <textarea
        className="w-full p-2 border"
        style={{ resize: "none" }}
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
        className="flex items-center justify-center text-center mt-2 p-2 h-8 w-16 bg-blue-500 text-white rounded-md text-sm"
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
     
    </div>
  );
}

