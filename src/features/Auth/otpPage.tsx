import React, { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
const OtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);


  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1 && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otp[index] !== '') {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0 && inputsRef.current[index - 1]) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };
const navigate=useNavigate();

  return (
    <>

     
        
        <div className='w-full min-h-screen flex justify-center items-center '>
          <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg ">
            <h1 className="text-2xl font-bold mb-6 text-center text-black-600">ادخل رمز التحقق</h1>
            
            <form  className="space-y-4">
              <label dir="rtl" className="block m-3 text-right"> رمز ال otp</label>
              <div className="flex justify-center gap-3 mt-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"                            
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
         ref={(el) => {
  inputsRef.current[index] = el;
}}
 required  

          className="w-12 h-12 text-center border border-gray-400 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
              

             

              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
               onClick={() => {
    if (otp.every((digit) => digit !== '')) {
      navigate('/resetpassword');
    } else {
      alert('من فضلك أدخل رمز التحقق بالكامل');
    }
  }}
               
              >
               تاكيد الرمز 
               
              </button>
             
              
            </form>
          </div>
        </div>

    



    </>
  );
};

export default OtpPage;


 
