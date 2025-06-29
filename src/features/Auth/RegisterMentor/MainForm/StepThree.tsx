import React, { useState } from 'react'
import SelectInput from './components/SelectInput';
import FormInput from './components/FormInput';
import DatePicker from './DatePicker';
import AddIcon from "@mui/icons-material/Add";

export default function StepThree() {
  let skills = ['المهارات'];
  const [skill, setSkill] = useState('');
  const [certificate, setCertificate] = useState('')
  const [organisation, setOrganisation] = useState('')
  return (
    <>
      <div className="my-8">
        <p className="text-3xl font-bold">
          المهارات والشهادات
        </p>
      </div>
      <form action="">
        <SelectInput
        id='skills'
        label='اختر المهارات التي تتقنها ويمكنك تعليمها'
        value={skill}
        options={skills}
        onChange={(e)=> setSkill(e.target.value)}
        />
       <div className="flex items-center gap-4">
        <div className="w-3/4">
         <FormInput
        id='certificates'
        label='هل لديك شهادات تثبت مهاراتك؟'
        placeholder='أضفها هنا'
        value={certificate}
        onChange={(e)=>setCertificate(e.target.value)}
        hint='يمكنك رفع ملفات الشهادات بصيغة PDF أو صورة'
        />
        </div>
        <div className="w-1/4">
        <button className="cursor-pointer flex items-center gap-2 px-4 border-1 border-blue-500 text-blue-700 p-2 rounded-lg">
          <span>
            <img src='/attach.png'></img>
            </span>
          تحميل
        </button>
        </div>
       </div>
       <FormInput
        id='organisation'
        label='من الجهة التي أصدرت الشهادة؟'
        placeholder='الجهة المانحة'
        value={organisation}
        onChange={(e)=>setOrganisation(e.target.value)}
        />
        <div className="form-control mb-8">
           <label htmlFor='certificateDate' className="block text-right mb-2 font-bold">
                  متى حصلت على هذه الشهادة؟
           </label>
           <div>
            <DatePicker></DatePicker>
           </div>
        </div>
         <div className="mb-8 add-details rounded border-blue-500 border-1 py-2 items-center justify-center flex cursor-pointer">
            <span className="p-1 inline-flex items-center justify-center text-white">
              <AddIcon fontSize="small" className="text-blue-500"/>
            </span>
            <p className="font-bold text-blue-500">
              اضف مهاره اخري
            </p>
          </div>
      </form>
    </>
  )
}
