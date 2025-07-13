import React, { useState } from 'react';
import img1 from'../../assets/images/pexels-olly-762020.jpg'
import img2 from'../../assets/images/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
import img3 from'../../assets/images/360_F_367464887_f0w1JrL8PddfuH3P2jSPlIGjKU2BI0rn.jpg'
import img4 from'../../assets/images/premium_photo-1689568126014-06fea9d5d341.jpeg'
import img5 from '../../assets/images/RW_Team_23-removebg-preview-551x408.png'
import img6 from '../../assets/images/head-shot-portrait-close-smiling-260nw-1714666150.webp'
const mentors = [
  {
    name: "سارة علي",
    img: img1,
    job: "مبرمجة وموجهة في مجال الذكاء الاصطناعي",
    bio: "سارة لديها أكثر من 7 سنوات من الخبرة في مجال الذكاء الاصطناعي والتعلم الآلي. عملت في العديد من المشاريع البحثية والتطبيقات التجارية في تحليل البيانات، والتعرف على الصور، ومعالجة اللغة الطبيعية. تتميز بأسلوب شرح مبسط وسلس يناسب جميع المستويات.",
  },
  {
    name: "عبد الرحمن",
    img: img2,
    job: "مصمم UI/UX",
    bio: "عبد الرحمن متخصص في تصميم واجهات المستخدم وتجربة المستخدم لأكثر من 5 سنوات. ساعد في تطوير تطبيقات ومواقع لصالح شركات ناشئة ومؤسسات تعليمية، ويتميز بدمج الجمال مع السهولة في الاستخدام. شغوف بمساعدة الطلاب على تحويل أفكارهم إلى واجهات جذابة وعملية.",
  },
  {
    name: "هالة سمير",
    img: img3,
    job: "مبرمجة في تطوير الويب",
    bio: "هالة تمتلك خبرة عميقة في تطوير مواقع الويب باستخدام HTML, CSS, JavaScript, React وNode.js. درّبت أكثر من 200 طالب على بناء مشاريع ويب متكاملة، وتحب مشاركة أفضل الممارسات في البرمجة وكتابة كود نظيف.",
  },
  {
    name: "أحمد محمد",
    img: img4,
    job: "محلل بيانات",
    bio: "أحمد يعمل كمحلل بيانات منذ أكثر من 6 سنوات، ويتقن استخدام أدوات مثل Excel, Python, SQL وPower BI. له خبرة في تحليل بيانات الأعمال واتخاذ قرارات مبنية على البيانات. ساعد العديد من الطلاب في فهم أساسيات تحليل البيانات وكيفية تقديم تقارير احترافية.",
  },
  {
    name: "نرمين سعيد",
    img: img5,
    job: "أخصائية أمن سيبراني",
    bio: "نرمين خبيرة في مجال أمن المعلومات ولديها خبرة في حماية الأنظمة من الهجمات والاختراقات. حاصلة على شهادات CEH وCISSP، وتقدم جلسات تدريبية عن التهديدات الإلكترونية وكيفية تأمين الشبكات والتطبيقات.",
  },
  {
    name: "خالد ياسر",
    img: img6,
    job: "مدرب قواعد بيانات",
    bio: "خالد متخصص في قواعد البيانات وإدارتها باستخدام MySQL وPostgreSQL وOracle. يقوم بتدريس أساسيات التصميم، العلاقات بين الجداول، واستعلامات SQL المعقدة، ويهتم بتبسيط المفاهيم النظرية وتطبيقها عملياً.",
  }
];


const MentorsCards = () => {
  const [selectedMentor, setSelectedMentor] = useState<any>(null);

  const handleAction = (action: string, mentor: any) => {
    alert(`${action} for ${mentor.name}`);
    setSelectedMentor(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {mentors.map((mentor, i) => (
        <div key={i} className="bg-white p-4 rounded shadow">
          <img src={mentor.img} alt="mentor" className="w-full h-40 object-cover rounded" />
          <h3 className="text-lg font-bold mt-2 cursor-pointer text-blue-800" onClick={() => setSelectedMentor(mentor)}>
            {mentor.name}
          </h3>
          <p>{mentor.job}</p>
        </div>
      ))}

      {selectedMentor && (
  <div className="fixed inset-0  bg-opacity-30 flex justify-center items-center z-50">
    <div
      className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md text-right"
      dir="rtl"
    >
      <h5 className="text-2xl font-bold text-blue-800 mb-4 border-b pb-2">
        {selectedMentor.name}
      </h5>

      <p className="text-gray-700 font-semibold mb-2">
        <span className="text-blue-700">المسمى الوظيفي:</span> {selectedMentor.job}
      </p>

      <p className="text-gray-600 mb-4 leading-relaxed">
        <span className="text-blue-700 font-medium">نبذة:</span> {selectedMentor.bio}
      </p>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold text-blue-700">الشهادات:</span> 
      </p>

      <p className="text-gray-700 mb-4">
        <span className="font-semibold text-blue-700">سعر الجلسة:</span> --- $
      </p>

      <div className="flex justify-between mt-4 gap-2">
        <button
          className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 font-semibold px-4 py-2 rounded"
          onClick={() => handleAction("قبول", selectedMentor)}
        >
           قبول
        </button>

        <button
          className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-semibold px-4 py-2 rounded"
          onClick={() => handleAction("مقابلة", selectedMentor)}
        >
           مقابلة
        </button>

        <button
          className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 font-semibold px-4 py-2 rounded"
          onClick={() => handleAction("رفض", selectedMentor)}
        >
           رفض
        </button>
      </div>

      <button
        className="mt-6 w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded transition"
        onClick={() => setSelectedMentor(null)}
      >
        إغلاق
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default MentorsCards;
