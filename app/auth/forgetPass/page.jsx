"use client"
import { useState } from 'react';
import SixInputsForm from '@/Components/SixInputsForm';
import { useRouter } from 'next/navigation';

export default function ForgetPass() {
  const [eMail, setEMail] = useState('');
  const [error, setError] = useState('');
  const [code, setCode] = useState(0);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(null)
  const router = useRouter();

  const handleEmailSubmit = async (e) => {
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
        setCode(verifyData.code)
        if (verifyResponse.ok) {
          setShowCodeInput(true);
        } 
        else {
          setError(verifyResponse.error || "Kod gönderilemedi");
        }
      } 
      else {
        setError("Mail adresi bulunamadı");
      }
    } 
    catch (error) {
      setError("Bir hata oluştu: " + error.message);
    }
  };

  const handleVerification = (isVerified) => {
    if (isVerified) {
      setShowPasswordInput(true);
    } else {
      setError("Kod yanlış");
    }
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
    if (value.length >= 8 && /[A-Z]/.test(value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }
    
    try {
      const response = await fetch('/api/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail: eMail, password: newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/auth/login');
      } else {
        setError(data.error || "Şifre sıfırlama başarısız oldu");
      }
    } catch (error) {
      setError("Bir hata oluştu: " + error.message);
    }
  };

  return (
    <div>
      {!showCodeInput && !showPasswordInput && (
        <form onSubmit={handleEmailSubmit}>
          <input
            className='p-2 border'
            type="email"
            value={eMail}
            onChange={(e) => setEMail(e.target.value)}
            placeholder="Email"
            required
          />
          <br/>
          <button className='mt-2 p-2 bg-blue-500 text-white' type="submit">Gönder</button>
        </form>
      )}
      {showCodeInput && !showPasswordInput && (
        <SixInputsForm
          code={code}
          onVerification={handleVerification}
        />
      )}
      {showPasswordInput && (
        <form onSubmit={handlePasswordSubmit}>
          <input
            className='p-2 border'
            type="password"
            value={newPassword}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="Yeni Şifre"
            required
          />
          <br/>
          <input
            className='p-2 border'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Yeni Şifreyi Onayla"
            required
          />
          <br/>
          {!passwordValid && newPassword.length > 0 && (
            <p className="w-18 h-4 py-2 text-s">
              The password must be at least 8 characters and contain at least one uppercase letter.
            </p>
          )}

          <br/>
          <button 
            className={`mt-2 p-2 bg-blue-500 text-white ${
              newPassword !== confirmPassword || !passwordValid ? 'opacity-50 cursor-not-allowed' : ''
            }`} 
            type="submit"
            disabled={newPassword !== confirmPassword || !passwordValid}
          >Şifreyi Sıfırla</button>
        </form>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
