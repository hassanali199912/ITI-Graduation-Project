
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          
          <div>
            <img src="./logo.svg" alt="Logo" className="w-24 mb-4" />
            <p className="text-sm">
              Code Mentor هي منصّة تعليمية تربط المتعلمين بمرشدين معتمدين في مجال البرمجة.
            </p>
          </div>

         
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline">الصفحة الرئيسية</a></li>
              <li><a href="/home" className="hover:underline">تسجيل الدخول</a></li>
              <li><a href="/createAccount" className="hover:underline">إنشاء حساب</a></li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-lg font-semibold mb-4">تابعنا</h3>
            <div className="flex gap-4 text-2xl">
              <a href="#"><FaFacebook className="hover:text-blue-300" /></a>
              <a href="#"><FaTwitter className="hover:text-blue-300" /></a>
              <a href="#"><FaInstagram className="hover:text-blue-300" /></a>
              <a href="#"><FaLinkedin className="hover:text-blue-300" /></a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-blue-400" />

      
        <p className="text-center text-sm text-blue-200">
          © {new Date().getFullYear()} Code Mentor. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
