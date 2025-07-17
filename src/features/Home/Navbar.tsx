import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header dir="rtl" className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <img src="./logo.svg" alt="logo" className="w-28 h-auto" />

        {/* Links */}
        <nav className="flex items-center gap-4 lg:gap-6 text-blue-800 font-medium text-base lg:text-lg">
          <Link
            to="/landingpage"
            className="px-4 py-2 rounded-md border border-blue-300 hover:bg-blue-100 transition duration-200"
          >
            الرئيسية
          </Link>
          <Link
            to="/dashboardMentor"
            className="px-4 py-2 rounded-md border border-blue-300 hover:bg-blue-100 transition duration-200"
          >
            لوحة المرشد
          </Link>
          <Link
            to="/dashboardAdmin"
            className="px-4 py-2 rounded-md border border-blue-300 hover:bg-blue-100 transition duration-200"
          >
            لوحة الإدارة
          </Link>
          <Link
            to="/mentors"
            className="px-4 py-2 rounded-md border border-blue-300 hover:bg-blue-100 transition duration-200"
          >
            المرشدين
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/home')}
            className="px-5 py-2 border border-blue-800 text-blue-800 rounded-lg hover:bg-blue-800 hover:text-white transition duration-200"
          >
            سجل الدخول
          </button>
          <button
            onClick={() => navigate('/createAccount')}
            className="px-5 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            انشاء حساب
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
