"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ForgetPass() {
  const [eMail, setEMail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/existMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail: eMail }),
      });
      
      const data = await response.json();
      
      if (data) {
        const verifyResponse = await fetch('/api/verifyMail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mail: eMail }),
        });
        
        const verifyData = await verifyResponse.json();
        
        if (verifyResponse.ok) {
          return <div>KOD GİRİNİZ</div>
        } else {
          setError(verifyData.error || "Kod gönderilemedi");
        }
      } else {
        setError("Mail adresi bulunamadı");
      }
    } catch (error) {
      setError("Bir hata oluştu: " + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">E-Mail</label>
          <input
            type="email"
            value={eMail}
            onChange={(e) => setEMail(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className={"mt-2 p-2 bg-blue-500 text-white"}
        >
          Update password
        </button>
      </form>
    </div>
  );
}
