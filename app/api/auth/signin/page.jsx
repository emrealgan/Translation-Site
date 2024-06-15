"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [eMail, setEMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      eMail: eMail,
      password: password,
      redirect: false,
    });

    if (result.error) {
      setError("Hatalı kullanıcı adı veya şifre");
    }
    else if(result.ok){
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Login</h1>
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
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white"
        >
          Login with Credentials
        </button>
      </form>
      <div>
   
      <Link href="../auth/register" className='text-blue-500'>
        Sign Up
      </Link>
      <br/>
      <Link href="../auth/forgetPass" className='text-blue-500'>
          Forget Password
      </Link>

      </div>
    </div>
  );
}
