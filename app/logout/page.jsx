"use client"
import { signOut } from 'next-auth/react';

export default function Logout() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Logout</h1>
      <button
        className="mt-2 p-2 bg-red-500 text-white"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}
