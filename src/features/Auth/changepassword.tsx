import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { FcGoogle } from 'react-icons/fc';

import { useLazyLoginQuery } from './api/login';

const ChangePassword = () => {

  const [triger, { data }] = useLazyLoginQuery()
const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  useEffect(() => {
    triger({});
  }, []);

  useEffect(() => {
    if (data) {
      console.log("this is data ", data);
    }
  }, [data])

const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
 const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    navigate('/sendotp')
if (validate()) {
      console.log('Form is valid ', formData);
      
    } else {
      console.log('Form has errors ', errors);
    }
  };
 


  return (
    <>

     
        
        <div className='w-full min-h-screen flex justify-center items-center '>
          <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg ">
            <h1 className="text-2xl font-bold mb-6 text-center text-black-600">ادخل الايميل للتحقق </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <label dir="rtl" className="block m-3 text-right">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                placeholder="Example@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-right "
                value={formData.email}
                onChange={handleChange}
                required
              />
              

             

              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
               ارسال الرمز 
              </button>
             
              <p className=" mb-6 text-center text-black-500 ">او قم بتسجيل الدخول باستخدام</p>
              <button

                className="w-full bg-white-800 text-blue-800  rounded-lg border border-blue-900 transition duration-200 flex items-center justify-center gap-3 p-2 "
              >
                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" >
                  <FcGoogle size={20} />
                </a>

                Google
              </button>
              <hr />
              <p className='text-gray-500 text-center'>ليس لديك حساب ؟
                <a href='#' > انشاء حساب كمتعلم او متدرب</a>
                </p>
            </form>
          </div>
        </div>

    



    </>
  );
};

export default ChangePassword;
