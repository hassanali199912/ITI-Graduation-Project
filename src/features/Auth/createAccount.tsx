
import img2 from '../../assets/images/learner.png'
import img3 from '../../assets/images/trainer.png'
const CreateAccount = () => {
    return (
        <>
             <div className="flex items-center justify-center min-h-screen bg-white flex gap-30 border border-gray-200 shadow-md w-full">
                <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">   Guidor!   اهلا بك فى
                        <br></br>كيف تحب ان تبدا رحلتك معنا</h1>

                        <div className='flex  mb-5' dir='rtl'>
                            <input
    type='radio'
    name='accountType'
    className='size-10 mt-10 ml-5'
  />
                            <img src={img3} className='w-40 h-40 bg-gray-300 rounded-2xl'></img>
                            <h1 className="text-2xl font-bold mb-6 text-center text-clack-800 mt-10 mr-10">انشاء حساب كمتعلم</h1>


                        </div>
                      
                        <div className='flex  'dir='rtl'>
                              <input
    type='radio'
    name='accountType'
    className='size-10 mt-10 ml-5'
  />
                            <img src={img2} className='w-40 h-40 bg-gray-300 rounded-2xl'></img>
                            <h1 className="text-2xl font-bold mb-6 text-center text-black-800 mt-10 mr-10">انشاء حساب كمتدرب</h1>


                        </div>
                        <div className='flex gap-70 mt-10'>
  <button  className=" bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 w-20">
استمرار
                        </button>
                        <p>لديك حساب؟<a className='text-blue-500' href='#'>سجل دخول</a></p>
                        </div>
                      
                </div>
             </div>
        </>
    );
}

export default CreateAccount;
