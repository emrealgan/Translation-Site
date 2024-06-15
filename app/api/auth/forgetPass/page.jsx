"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
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
