import React from 'react';
import { type FormData } from '../types';

interface Props {
  formData: FormData;
  onSubmit: () => void;
}

export default function ReviewPage({ formData, onSubmit }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 border-b-2 border-blue-500 pb-4">
          مراجعة التسجيل النهائية
        </h1>

        {/* Personal Information Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">المعلومات الشخصية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-700"><strong className="text-blue-500">الاسم الأول:</strong> {formData.stepOne.firstName}</p>
            <p className="text-gray-700"><strong className="text-blue-500">الاسم الأخير:</strong> {formData.stepOne.lastName}</p>
            <p className="text-gray-700"><strong className="text-blue-500">البريد الإلكتروني:</strong> {formData.stepOne.email}</p>
            <p className="text-gray-700"><strong className="text-blue-500">رقم الهاتف:</strong> {formData.stepOne.phoneNumber}</p>
            <p className="text-gray-700"><strong className="text-blue-500">الجنس:</strong> {formData.stepOne.gender === 1 ? 'ذكر' : 'أنثى'}</p>
            <p className="text-gray-700"><strong className="text-blue-500">السيرة الذاتية:</strong> {formData.stepOne.bio || 'غير محدد'}</p>
            <p className="text-gray-700"><strong className="text-blue-500">اللغة:</strong> {formData.stepOne.lang || 'غير محدد'}</p>
            <p className="text-gray-700"><strong className="text-blue-500">الدولة:</strong> {formData.stepOne.countryId || 'غير محدد'}</p>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">التعليم</h2>
          {formData.stepTwo.educations.map((edu, index) => (
            <div key={index} className="mb-4 p-4 bg-white rounded-md shadow-inner">
              <p className="text-gray-700"><strong className="text-green-500">المؤسسة التعليمية:</strong> {edu.institution}</p>
              <p className="text-gray-700"><strong className="text-green-500">الدرجة العلمية:</strong> {edu.degree}</p>
              <p className="text-gray-700"><strong className="text-green-500">التخصص:</strong> {edu.field}</p>
              <p className="text-gray-700"><strong className="text-green-500">تاريخ البداية:</strong> {edu.startDate || 'غير محدد'}</p>
              <p className="text-gray-700"><strong className="text-green-500">تاريخ النهاية:</strong> {edu.endDate || 'غير محدد'}</p>
              <p className="text-gray-700"><strong className="text-green-500">الوصف:</strong> {edu.description || 'غير محدد'}</p>
            </div>
          ))}
        </div>

        {/* Certificates Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-4">الشهادات</h2>
          {formData.stepThree.certificates.map((cert, index) => (
            <div key={index} className="mb-4 p-4 bg-white rounded-md shadow-inner">
              <p className="text-gray-700"><strong className="text-yellow-500">اسم الشهادة:</strong> {cert.name}</p>
              <p className="text-gray-700"><strong className="text-yellow-500">المؤسسة الصادرة عنها:</strong> {cert.issuedBy}</p>
              <p className="text-gray-700"><strong className="text-yellow-500">تاريخ الإصدار:</strong> {cert.issuedDate || 'غير محدد'}</p>
              <p className="text-gray-700"><strong className="text-yellow-500">نتيجة الامتحان:</strong> {cert.examResult || 'غير محدد'}</p>
            </div>
          ))}
        </div>

        {/* Teaching Preferences Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">تفضيلات التدريس</h2>
          <p className="text-gray-700"><strong className="text-purple-500">مجالات التدريس:</strong> {formData.stepFour.teachingAreaIds.join(', ') || 'غير محدد'}</p>
          <p className="text-gray-700"><strong className="text-purple-500">فئات الأعمار:</strong> {formData.stepFour.ageGroupIds.join(', ') || 'غير محدد'}</p>
          <p className="text-gray-700"><strong className="text-purple-500">طرق التواصل:</strong> {formData.stepFour.communicationMethodIds.join(', ') || 'غير محدد'}</p>
          <p className="text-gray-700"><strong className="text-purple-500">لغات التدريس:</strong> {formData.stepFour.teachingLanguageIds.join(', ') || 'غير محدد'}</p>
          <p className="text-gray-700"><strong className="text-purple-500">الاهتمامات الإضافية:</strong> {formData.stepFour.additionalInterests?.join(', ') || 'غير محدد'}</p>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={onSubmit}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105"
          >
            تأكيد التسجيل
          </button>
        </div>
      </div>
    </div>
  );
}