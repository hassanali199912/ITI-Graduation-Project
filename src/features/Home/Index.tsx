import type React from "react";
import img1 from "../../assets/images/3d-render-power-knowledge-concept-book-lamp 1 (1).png"
import img2 from"../../assets/images/quote.png"
import img3 from"../../assets/images/quote (1).png"
import img4 from"../../assets/images/3d_character_206 [Converted]-01 1.png"
import img5 from "../../assets/images/icon-park-outline_check-one.png"
import img6 from "../../assets/images/7228757 1.png"
import img7 from"../../assets/images/Group.png"
import img8 from"../../assets/images/Group (1).png"
import img9 from"../../assets/images/Group (2).png"
import img10 from"../../assets/images/Group (3).png"
import img11 from"../../assets/images/Group (4).png"
import img12 from"../../assets/images/Group (5).png"
import img13 from"../../assets/images/Group 7.png"
import img14 from"../../assets/images/Group 9.png"
import img15 from"../../assets/images/Group 10.png"
import Footer from "./footer";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate=useNavigate();
  return (
    <>
    
    <div className="bg-blue-50">
<div className="relative w-fit mt-30 ml-30 ">
 
  <img src={img2} alt="Mentor Image" className="mt-5 ml-55" />

  
  <div className="absolute top-3 right-6 text-blue-800 text-xl font-bold text-right leading-loose">
    تواصل مع مرشدين معتمدين لمساعدتك في التعلّم،  
    <br />
    حل المشكلات، أو تطوير مشاريعك البرمجية
  </div>
</div>



<div className="flex justify-center items-center -mt-50">
  <img src={img1} alt="image" />
</div>
<div className="relative w-fit -mt-60 ml-220 ">
  
  <img src={img3} alt="Mentor Image" className="mt-5 ml-50" />

  
  <div className="absolute top-3 -right-5 text-blue-800 text-xl font-bold text-left leading-loose">
    إبدأ رحلتك في البرمجة بدعم<br></br> مباشر من خبراء حقيقيين
  </div>
</div>
<div className="flex gap-4 justify-center mt-20 ">
  
<button
  type="button"
  className="bg-white-500 hover:bg-yellow-500  hover:text-white text-yellow-500 font-medium py-2 px-4 rounded border border-yellow-500"
>
  احجز جلسة الان 
</button>
<button
  type="button"
  className="bg-yellow-500 hover:bg-yellow-600   text-white font-medium py-2 px-4 rounded"
>
  انضم كمتدرب
</button>
</div>
</div>
<div>
  <h2 className="text-blue-800 text-2xl font-bold text-center mt-10">لماذا نحن؟</h2>
  <div className="flex justify-center gap-40 items-start">
  {/* الصورة الجانبية */}
  <img src={img4} alt="Side Image" />

  {/* الليست */}
 <ul className="flex flex-col gap-4 mt-30">
  <li className="flex flex-row-reverse items-center gap-3 text-black text-xl font-bold">
    <img src={img5} alt="check icon" />
    مرشدون معتمدون بخبرة حقيقية
  </li>

  <li className="flex flex-row-reverse items-center gap-3 text-black text-xl font-bold">
    <img src={img5} alt="check icon" />
    دعم فوري أو جلسات مجدولة
  </li>

  <li className="flex flex-row-reverse items-center gap-3 text-black text-xl font-bold">
    <img src={img5} alt="check icon" />
    توجيه شخصي في مختلف التخصصات
  </li>

  <li className="flex flex-row-reverse items-center gap-3 text-black text-xl font-bold">
    <img src={img5} alt="check icon" />
    باللغة العربية، لفهم أسهل وتواصل مباشر
  </li>
</ul>


</div>

</div>

<div className="bg-blue-50 justify-center">
   <h2 className="text-blue-800 text-2xl font-bold text-center mt-30">كيف يعمل الموقع؟ </h2>
<div className="flex justify-center items-center gap-10">
  
  <div className="grid grid-cols-2 gap-6">
    <div className="bg-white shadow rounded-2xl p-5" dir="rtl">
      <h1 className="text-blue-800 text-2xl font-bold">1</h1>
      <p className="text-xl font-bold">انشئ حسابك كمستخدم أو مرشد</p>
    </div>
    <div className="bg-white shadow rounded-2xl p-5" dir="rtl">
      <h1 className="text-blue-800 text-2xl font-bold">2</h1>
      <p className="text-xl font-bold">تصفّح قائمة المرشدين حسب التخصص</p>
    </div>
    <div className="bg-white shadow rounded-2xl p-5" dir="rtl">
      <h1 className="text-blue-800 text-2xl font-bold">3</h1>
      <p className="text-xl font-bold">احجز جلسة أو اطلب دعمًا فوريًا</p>
    </div>
    <div className="bg-white shadow rounded-2xl p-5" dir="rtl">
      <h1 className="text-blue-800 text-2xl font-bold">4</h1>
      <p className="text-xl font-bold">تواصل عبر الدردشة أو الفيديو</p>
    </div>
  </div>

 
  <img src={img6} alt="Guide" className="w-96 h-auto" />
</div>

</div>


<div >
   <h2 className="text-blue-800 text-2xl font-bold text-center mt-30 mb-20">المجالات المتاحة</h2>
   <div className="grid grid-cols-4 m-10 justify-center gap-10  max-w-4xl mx-auto"  >
    <div >
<img src={img8}></img>
<p className="text-xl text-yellow-500 font-bold"  >تصميم UiUx   </p>
    </div>
<div>
<img src={img9}></img>
<p className="text-xl text-yellow-500 font-bold"  > قواعد البيانات   </p></div>
<div>
<img src={img10}></img>
<p className="text-xl text-yellow-500 font-bold"  >الذكاء الاصطناعى    </p></div>
<div>


<img src={img11}></img>
<p className="text-xl text-yellow-500 font-bold"  > تطوير الويب   </p></div>
<div className="col-span-4 flex justify-center gap-30">
    <div>
      <img src={img7} />
      <p className="text-xl text-yellow-500 font-bold">الامن السيبرانى</p>
    </div>

    <div>
      <img src={img12} />
      <p className="text-xl text-yellow-500 font-bold">علوم البيانات</p>
    </div>
  </div>
   </div>
</div>
<div className="bg-yellow-50 py-16">
  
  <div className="flex items-center justify-center gap-40 mb-10">
   
    <button className="text-yellow-500 text-3xl font-bold hover:text-yellow-600 ">
     {"<"}
    </button>

    <h2 className="text-blue-800 text-3xl font-bold text-center">
      آراء المستخدمين
    </h2>

    
    <button className="text-yellow-500 text-3xl font-bold hover:text-yellow-600">
     {">"}
    </button>
  </div>

   
  <div className="flex justify-center gap-2 mb-10">
    <span className="w-3 h-3 rounded-full bg-orange-400"></span>
    <span className="w-3 h-3 rounded-full bg-gray-300"></span>
    <span className="w-3 h-3 rounded-full bg-gray-300"></span>
    <span className="w-3 h-3 rounded-full bg-gray-300"></span>
    <span className="w-3 h-3 rounded-full bg-gray-300"></span>
  </div>
  <div className="flex justify-center gap-6 mb-8">
    <img src={img13} alt="review1" />
    <img src={img15} alt="review2" />
    <img src={img14} alt="review3" />
  </div>



 
  <div className="flex justify-center">
    <button
      type="submit"
      className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      onClick={()=>{navigate('/createAccount')}}
    >
      انشئ حسابك مجانا
    </button>
  </div>
</div>

    </>
  );
};

export default Home;
