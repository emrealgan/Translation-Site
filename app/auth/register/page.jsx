"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SixInputsForm from '@/Components/SixInputsForm';

export default function Register() {
  const [eMail, setEMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState('');
  const router = useRouter();

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (value.length >= 8 && /[A-Z]/.test(value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/existMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mail: eMail,
        }),
      });

      const data = await response.json();

      if (response.ok && !data.exists) {
        const verifyResponse = await fetch('/api/verifyMail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mail: eMail,
          }),
        });

        const verifyData = await verifyResponse.json();

        if (verifyResponse.ok) {
          setCode(verifyData.code);
          setShowCodeInput(true);
        } else {
          setError('Failed to send verification code');
        }
      } else {
        setError('Email already exists');
      }
    } catch (error) {
      setError('An error occurred: ' + error.message);
    }
  };

  const handleCodeSubmit = async (isVerified) => {
    if (isVerified) {
      try {
        const response = await fetch('/api/register', {
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
          router.push('/auth/login');
        } else {
          setError('Failed to register user');
        }
      } catch (error) {
        setError('An error occurred: ' + error.message);
      }
    } else {
      setError('Invalid verification code');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      {!showCodeInput && (
        <form onSubmit={handleEmailSubmit}>
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
          {!passwordValid && password.length > 0 && (
            <p className="w-18 h-4 py-2 text-s">
              The password must be at least 8 characters and contain at least one uppercase letter.
            </p>
          )}
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            className={`mt-2 p-2 bg-blue-500 text-white ${
              password !== confirmPassword || !passwordValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={password !== confirmPassword || !passwordValid}
          >
            Register with Credentials
          </button>
        </form>
      )}
      {showCodeInput && (
        <div>
          <p>Verification code has been sent to your email.</p>
          <SixInputsForm code={code} onVerification={handleCodeSubmit} />
          {error && <div className="text-red-500">{error}</div>}
        </div>
      )}
    </div>
  );
}
