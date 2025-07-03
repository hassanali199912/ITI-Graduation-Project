import { useNavigate } from 'react-router-dom';

import { FcCheckmark } from 'react-icons/fc';
import img2 from '../../assets/images/learner.png'
import img3 from '../../assets/images/trainer.png'
import { useState } from 'react';


const CreateAccount = () => {

    const [accountType, setAccountType] = useState<string | null>(null);

const navigate = useNavigate();

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-white  gap-30 border border-gray-200 shadow-md w-full">
                <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">   Guidor!   اهلا بك فى
                        <br></br>كيف تحب ان تبدا رحلتك معنا</h1>

                    <div className='flex  mb-5' dir='rtl'>
                        <input
                            type='radio'
                            name='accountType'
                            className='size-10 mt-10 ml-5'
                            checked={accountType === 'learner'}
                            onChange={() => setAccountType('learner')}
                            
                        />
                        <img src={img3} className='w-40 h-40 bg-gray-300 rounded-2xl' />
                        <div className='px-5'>
                            <h1 className="text-2xl font-bold text-center text-clack-800">انشاء حساب كمتعلم</h1>
                            {accountType === "learner" && (
                                <ul className='flex flex-col gap-1'>
                                    <li className='flex items-center gap-3 opacity-50'>
                                        <FcCheckmark />  <span>احجز جلساتك الان </span>
                                    </li >
                                    <li className='flex items-center gap-3 opacity-50'>
                                        <FcCheckmark />  <span>احجز جلساتك الان </span>
                                    </li>
                                    <li className='flex items-center gap-3 opacity-50'>
                                        <FcCheckmark />  <span>احجز جلساتك الان </span>
                                    </li>
                                </ul>
                            )}
                        </div>

                    </div>

                    <div className='flex ' dir='rtl'>
                        <input
                            type='radio'
                            name='accountType'
                            className='size-10 mt-10 ml-5'
                            checked={accountType === 'mentor'}
                            onChange={() => setAccountType('mentor')}

                        />
                        <img src={img2} className='w-40 h-40 bg-gray-300 rounded-2xl'></img>
                        <div className='px-5'>
                            <h1 className="text-2xl font-bold text-center text-clack-800">انشاء حساب كمتدرب</h1>
                            {accountType === "mentor" && (
                                <ul className='flex flex-col gap-1'>
                                    <li className='flex items-center gap-3 opacity-50'>
                                        <FcCheckmark />  <span>احجز جلساتك الان </span>
                                    </li >
                                    <li className='flex items-center gap-3 opacity-50'>
                                        <FcCheckmark />  <span>احجز جلساتك الان </span>
                                    </li>
                                    <li className='flex items-center gap-3 opacity-50'>
                                        <FcCheckmark />  <span>احجز جلساتك الان </span>
                                    </li>
                                </ul>
                            )}
                        </div>

                    </div>
                    <div className='flex gap-70 mt-10 justify-between'>
                        <button
  disabled={!accountType}
  onClick={() => {
    if (accountType === 'learner') {
      navigate('/registerlearner');
    } else if (accountType === 'mentor') {
      navigate('/registermentor');
    }
  }}
  className={`py-2 px-6 rounded-lg transition duration-200 
    ${accountType ? 'bg-blue-800 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
>
  استمرار
</button>
                        <p>لديك حساب ؟ <a className='text-blue-500' href='/home'>سجل دخول</a></p>
                    </div>

                </div>
            </div>
        </>
    );
}

export default CreateAccount;
