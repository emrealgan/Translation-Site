"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function History() {
  const { data: session, status } = useSession();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchHistory = async () => {
        try {
          const res = await fetch('/api/history', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail: session.user.email }),
          });

          if (!res.ok) {
            console.error('Failed to fetch history:', res.statusText);
            return;
          }

          const data = await res.json();
          setHistory(data.history);
        } catch (error) {
          console.error('Error fetching history:', error);
        }
      };

      fetchHistory();
    }
  }, [status, session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!session) {
    return <div>You are not authenticated.</div>;
  }
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Translation History</h1>
      <div className="mt-4">
        {history.map((item, index) => (
          <div key={index} className="p-2 border-b">
            <p><strong>Original Text:</strong> {item.originalText}</p>
            <p><strong>Translated Text:</strong> {item.translatedText}</p>
            <p><strong>Source Language:</strong> {item.sourceLanguage}</p>
            <p><strong>Target Language:</strong> {item.targetLanguage}</p>
            <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
