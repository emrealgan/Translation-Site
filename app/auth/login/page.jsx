"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TranslateImage from '@/Components/TranslateImage';
import googleIcon from '@/public/google.png'

export default function Login() {

  const [eMail, setEMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("◌")

    const result = await signIn('credentials', {
      mail: eMail,
      password: password,
      redirect: false,
    });
    if (result.ok) {
      router.push('/');
      router.refresh();
    }
    else if (result.error) {
      setError("Hatalı kullanıcı adı veya şifre");
    }
  };
  const handleGoogleSignIn = async () => {
    setError("◌")
    await signIn('google', { callbackUrl: '/' });
  };
  return (
    <div className="container flex flex-row p-4 h-screen w-full">
      <TranslateImage/>
      <div className='w-1/2 h-full flex justify-center items-center -mt-8 -ml-40'>
        <form onSubmit={handleSubmit} className='h-72 w-3/5'>
          <h1 className="text-2xl font-bold mb-4 text-blue-300 text-center">Login</h1>
          <div className="mb-4 h-12 w-full">
            <label className="block text-blue-300">E-Mail</label>
            <input
              type="text"
              value={eMail}
              onChange={(e) => setEMail(e.target.value.trim().toLowerCase())}
              className="h-8 w-full p-2 border"
            />
          </div>
          <div className="mb-4 flex flex-col h-12 w-full mb-4">
            <label className="block text-blue-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              className="h-8 w-full p-2 border"
            />
            <div className="flex justify-end">
              <Link href="forgetPass" className="p-1 text-xs text-gray-600 hover:underline">
                Forgot Password
              </Link>
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex space-x-4 mt-12">
            <button
              type="submit"
              className="mb-4 p-2 text-gray-600 bg-blue-300 hover:bg-blue-200 h-10 w-52 rounded-lg"
            >
              Sign in
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="flex flex-row items-center justify-center p-2 bg-blue-300 text-gray-600 hover:bg-blue-200 h-10 w-52 rounded-lg"
            > 
              <Image className='p-1 rounded-md' src={googleIcon} width={24} height={24} alt="Google Icon" />
              <span className='pl-2 text-xs' >Sign in with Google</span>
            </button>
          </div>

          <Link href="register" className='text-gray-600 hover:underline'>
            Sign Up
          </Link>  
        </form>
      
      </div>
    </div>

  );
}
