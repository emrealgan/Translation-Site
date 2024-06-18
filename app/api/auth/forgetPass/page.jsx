"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ForgetPass() {
  const [eMail, setEMail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uppercaseRegex = /[A-Z]/;
    if (password.length < 8 || !uppercaseRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter.');
      return;
    }
    try {
      const response = await fetch('/api/database/existMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mail: eMail,
        }),
      });
      if(response == null){
        setError("Mail adresi bulunamadı");
        return
      }  
    } 
    catch (error) {
      return error;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">E-Mail</label>
          <input
            type="text"
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
