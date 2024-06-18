"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
  const [eMail, setEMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordValid, setPasswordValid] = useState(false); // State to track password validity
  const router = useRouter();

  const handlePasswordChange = (value) => {
    setPassword(value);
    // Check password requirements
    if (value.length >= 8 && /[A-Z]/.test(value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!passwordValid) {
      setError("Password must be at least 8 characters long and contain at least one uppercase letter");
      return;
    }
    if(eMail == password) {
      setError("Password and email must not be the same");
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
      if(response == null)
        setError("Mail adresi kayıtlı")
    } 
    catch (error) {
      return error;
    }

    try {
      const response = await fetch('/api/database/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mail: eMail,
          password: password,
        }),
      });
      
      if (response.ok) {
        console.log('User registered successfully');
      } 
      else if(response.status == 500){
        setError("Email already exist")
      }
    } 
    catch (error) {
      console.error('Error registering user:', error);
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
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className={`mt-2 p-2 bg-blue-500 text-white ${password !== confirmPassword || !passwordValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={password !== confirmPassword || !passwordValid} 
        >
          Register with Credentials
        </button>
        
      </form>
    </div>
  );
}
