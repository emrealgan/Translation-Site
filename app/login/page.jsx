"use client"
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <button
        className="mt-2 p-2 bg-blue-500 text-white"
        onClick={() => signIn('credentials')}
      >
        Login with Credentials
      </button>
    </div>
  );
}
