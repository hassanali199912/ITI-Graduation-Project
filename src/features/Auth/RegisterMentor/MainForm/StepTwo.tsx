import React from 'react';

const StepTwo = () => {
  return (
    <>
    <form action="" className='my-16'>
       <div className="form-control mb-8">
      <label htmlFor="qualification" className="block text-right mb-2">المؤهل الدراسي</label>
      <input type="text" id="qualification" className="bg-blue-100 p-2 w-full rounded" placeholder="ما هو آخر مؤهل حصلت عليه؟" />
    </div>
    <div className="form-control mb-8">
      <label htmlFor="org" className="block text-right mb-2">المؤسسة التعليمية</label>
      <input type="text" className="bg-blue-100 p-2 w-full rounded" id="org" placeholder='من أين حصلت على هذا المؤهل؟'/>
    </div>
    <div className="form-control mb-8">
      <label htmlFor="spec" className='block text-right mb-2'>التخصص الدراسى</label>
      <input type="text" className='bg-blue-100 p-2 w-full rounded' id='spec' placeholder='ما هو تخصصك الأكاديمى ؟ '/>
    </div>
    </form>
    
    </>
  );
};

export default StepTwo;
