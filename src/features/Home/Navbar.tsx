import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);



// في Navbar
useEffect(() => {
  const updateFromStorage = () => {
    setRole(localStorage.getItem("role"));
    setId(localStorage.getItem("teacherId"));
  };

  updateFromStorage();
  window.addEventListener("roleUpdated", updateFromStorage);

  return () => {
    window.removeEventListener("roleUpdated", updateFromStorage);
  };
}, []);



  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    navigate("/");
  };

  return (
    <header dir="rtl" className="bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <img src="./logo.svg" alt="logo" className="w-28 h-auto" />

        {/* Links */}
        <nav className="flex items-center gap-4 lg:gap-6 text-blue-800 font-medium text-base lg:text-lg">
          {(role === "teacher" || role === "admin"|| role === "student") &&(
          <Link to="/landingpage" className="hover:text-white px-4 py-2 rounded-md border border-blue-300 hover:bg-blue-800 transition duration-200 cursor-pointer">
            الرئيسية
          </Link>)}
          

          {/* Role-based Links */}
          {role === "teacher" && (
            <>
              <Link to="/dashboardMentor" className="hover:text-white transition border border-blue-300 rounded-5 p-2 hover:bg-blue-800 cursor-pointer">لوحة المرشد</Link>
              {id && <Link to={`/mentors/${id}`} className="hover:text-white transition border border-blue-300 rounded-5 p-2 hover:bg-blue-800 cursor-pointer">الصفحة الشخصية</Link>}
            </>
          )}
          {role === "admin" && (
            <>
              <Link to="/dashboardAdmin" className="hover:text-white transition border border-blue-300 rounded-5 p-2 hover:bg-blue-800 cursor-pointer">لوحة الإدارة</Link>
             
            </>
          )}
          {role === "student" && (
            <Link to="/mentors" className="hover:text-white transition border border-blue-300 rounded-5 p-2 hover:bg-blue-800 cursor-pointer">المرشدين</Link>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          {role ? (
            <button
              onClick={handleLogout}
              className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition text-white"
            >
              تسجيل الخروج
            </button>
          ) : (
            <>
              <button
                type="button"
                className="border border-blue-800 text-blue-800 px-6 py-2 rounded-lg hover:bg-blue-800 hover:text-white transition duration-200"
                onClick={() => navigate('/home')}
              >
                سجل الدخول
              </button>
              <button
                type="button"
                className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={() => navigate('/createAccount')}
              >
                انشاء حساب
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
