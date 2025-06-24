import  { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FcGoogle } from 'react-icons/fc';
import img1 from '../../assets/images/amico.png';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Login Data:', formData);
   
  };
   const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>

    <div className="flex items-center justify-center min-h-screen bg-white flex gap-30 border border-gray-200 shadow-md w-full">
      
      <div className='bg-gray-100 w-100 h-170 border border-gray-300 shadow-lg flex flex-col items-center justify-center '>
<img src={img1} className='items-center justify-center w-70 h-70'></img>

<h3  className="text-xl font-bold mb-6  text-black-600 text-center"> من البداية وحتى الاحتراف، لست "
  <br></br>وحدك… تعلم، اسأل، وتطوّر مع<br></br> الدعم الذي تحتاجه، في الوقت <br></br> ".الذي تحتاجه</h3>
</div>
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black-600">سجل الدخول لحسابك</h1>
        <p className=" mb-6 text-center text-gray-400">الرجاء تسجيل الدخول للمتابعة</p>
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
           <label dir="rtl" className="block m-3 text-right"> كلمة المرور</label>
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
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

           <p className=" mb-6 text-right text-gray-400 ">يجب ان تكون من 8 حروف وارقام ورمور على الاقل</p>
           <div className='flex gap-45'>
            <div className='flex gap-3'>
 <p className="text-gray-400 text-left">تذكرنى</p>
             <input type='checkbox' className='mb-4'></input>
            </div>
           
 <p className=" mb-6  text-gray-400 text-right">نسيت كلمة السر؟</p>
           
           </div>
           
          
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            سجل الدخول
          </button>
          <hr>
          </hr>
          <p className=" mb-6 text-center text-black-500 ">او قم بتسجيل الدخول باستخدام</p>
          <button
           
            className="w-full bg-white-800 text-blue-800  rounded-lg border border-blue-900 transition duration-200 flex items-center justify-center gap-3 p-2 "
          >
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" >
  <FcGoogle size={20} />
</a>

            Google
          </button>
          <hr></hr>
          <p className='text-gray-500'>ليس لديك حساب ؟ <a href='#' className='text-blue-400'>انشاء حساب كمتعلم او متدرب</a></p>
        </form>
      </div>

    </div>



</>
  );
};

export default Login;
