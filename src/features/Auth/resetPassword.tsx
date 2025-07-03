import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


import { useLazyLoginQuery } from './api/login';
import { useNavigate } from 'react-router-dom';

const  ResetPassword= () => {

  const [triger, { data }] = useLazyLoginQuery()

  useEffect(() => {
    triger({});
  }, []);

  useEffect(() => {
    if (data) {
      console.log("this is data ", data);
    }
  }, [data])


  const [formData, setFormData] = useState({ email: '', password: '',confirmPassword: '' });
 const [showPassword, setShowPassword] = useState(false);
 const [errors, setErrors] = useState<{ password?: string }>({});
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const validate = () => {
    const newErrors: typeof errors = {};

   if (!formData.password) {
  newErrors.password = 'Password is required';
} else if (formData.password.length < 8) {
  newErrors.password = 'Password must be at least 8 characters';
} else if (!/[A-Za-z]/.test(formData.password)) {
  newErrors.password = 'Password must include at least one letter';
} else if (!/[0-9]/.test(formData.password)) {
  newErrors.password = 'Password must include at least one number';
} else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
  newErrors.password = 'Password must include at least one symbol';
}


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    if (formData.password !== formData.confirmPassword) {
  alert("كلمة المرور غير متطابقة");
  return;
  
}

  };
 const togglePassword = () => {
    setShowPassword(!showPassword);
  };

const navigate=useNavigate()
  return (
    <>

     
        
        <div className='w-full min-h-screen flex justify-center items-center '>
          <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg ">
            <h1 className="text-2xl font-bold mb-6 text-center text-black-600">تعيين كلمة المرور</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <label dir="rtl" className="block m-3 text-right">   كلمة المرور الجديدة</label>
                           <div className="relative">
             
                             <input
                               type={showPassword ? 'text' : 'password'}
                               name="password"
                               placeholder=""
                               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 text-right "
                               value={formData.password}
                               onChange={handleChange}
                               required
                             />
                             <span
                               onClick={togglePassword}
                               className="absolute left-3 top-3 cursor-pointer text-gray-600 "
                             >
                               <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                             </span>
                           </div>
             
                           <p className=" mb-6 text-right text-gray-400 ">يجب ان تكون من 8 حروف وارقام ورمور على الاقل</p>
              
<label dir="rtl" className="block m-3 text-right">    تاكيد كلمة المرور </label>
                           <div className="relative">
             
                             <input
                               type={showPassword ? 'text' : 'password'}
                               name="confirmPassword"
                               placeholder=""
                               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 text-right "
                               value={formData.confirmPassword}
                               onChange={handleChange}
                               required
                             />
                             <span
                               onClick={togglePassword}
                               className="absolute left-3 top-3 cursor-pointer text-gray-600 "
                             >
                               <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                             </span>
                           </div>
             
<br></br>
              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                  onClick={() => {
    if (formData.password&&formData.confirmPassword!== '') {
      navigate('/home');
    } else {
      alert('من فضلك ادخل كلمه المرور ');
    }
  }}
              >
               تغيير كلمة المرور
              </button>
              
            </form>
          </div>
        </div>

    



    </>
  );
};

export default ResetPassword;















































































































