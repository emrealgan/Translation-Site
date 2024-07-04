"use client"
import { useState, useRef, useEffect } from 'react';

const SixInputsForm = ({ code, onVerification }) => {
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  // Refs oluşturma ve ilk input alanına odaklanma
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, event) => {
    const value = event.target.value;
    // Sadece bir karakter kabul etme
    if (value.length > 1) {
      return;
    }

    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    // Sonraki input alanına geçiş yapma
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredCode = inputs.join('');
    if (enteredCode === code.toString()) {
      onVerification(true); // Doğrulama başarılı ise ana bileşene bildir
    } else {
      onVerification(false); // Doğrulama başarısız ise ana bileşene bildir
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {inputs.map((input, index) => (
          <div key={index}>
            <input
            className='bg-gray-100'
              ref={(ref) => (inputRefs.current[index] = ref)}
              type="text"
              value={input}
              onChange={(event) => handleChange(index, event)}
              style={{
                width: '30px',
                textAlign: 'center',
                marginRight: '10px',
              }}
              maxLength="1"
              required
            />
          </div>
        ))}
      </div>
      <button className='mt-2 p-2 bg-blue-500 text-white' type="submit">Doğrula</button>
    </form>
  );
};

export default SixInputsForm;
