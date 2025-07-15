const students = [
  { name: "أحمد", email: "ahmed@gmail.com", major: "الذكاء الاصطناعي",},
  { name: "سارة", email: "sara@yahoo.com", major: "تطوير الويب", },
  { name: "محمد", email: "mohamed@yahoo.com", major: "UI/UX" , },
  { name: "مصطفى", email: "mostafa@yahoo.com", major: "أنظمة المعلومات", },
 
];

const Students = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center border-b pb-4">
        قائمة الطلاب المتابعين
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {students.map((student, index) => (
          <div key={index} className="bg-blue-50 rounded-lg p-6 shadow hover:shadow-md transition "dir="rtl">
            <h3 className="text-xl font-bold text-blue-800 mb-2">{student.name}</h3>
           
            <p className="text-black"><span className="font-semibold">التخصص:</span> {student.major}</p>
             <p className="text-blue-700 mb-1"><span className="font-semibold">البريد:</span> {student.email}</p>
              
               <div dir="ltr">
               <button className="bg-blue-500 hover:bg-blue-600  text-white  font-medium py-2 px-4 rounded border border-yellow-500 ">تواصل</button>
               </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
