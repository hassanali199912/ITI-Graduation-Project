import React, { useState } from 'react'
import SelectInput from './components/SelectInput';
import FormInput from './components/FormInput';

export default function StepThree() {
  let skills = ['المهارات'];
  const [skill, setSkill] = useState('');
  const [certificate, setCertificate] = useState('')
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
        <FormInput
        id='certificates'
        label='هل لديك شهادات تثبت مهاراتك؟'
        placeholder='أضفها هنا'
        value={certificate}
        onChange={(e)=>setCertificate(e.target.value)}
        />
        <button className="border-1 border-blue-500 text-blue-700 p-2 rounded-lg">
          <span></span>
          تحميل
        </button>
      </form>
    </>
  )
}
