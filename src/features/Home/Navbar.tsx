import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedId = localStorage.getItem("teacherId");
    setRole(storedRole);
    setId(storedId);

    const handleRoleUpdate = () => {
      const updatedRole = localStorage.getItem("role");
      setRole(updatedRole);
    };

    window.addEventListener("roleUpdated", handleRoleUpdate);
    return () => {
      window.removeEventListener("roleUpdated", handleRoleUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    navigate("/");
  };

  return (
    <header dir="rtl" className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <img src="./logo.svg" alt="logo" className="w-28 h-auto" />

        {/* Links */}
        <nav className="flex items-center gap-4 lg:gap-6 text-blue-800 font-medium text-base lg:text-lg">
          <Link to="/landingpage" className="px-4 py-2 rounded-md border border-blue-300 hover:bg-blue-100 transition duration-200">
            الرئيسية
          </Link>
          

          {/* Role-based Links */}
          {role === "teacher" && (
            <>
              <Link to="/dashboardMentor" className="hover:text-blue-500 transition border border-blue-300 rounded-5 p-2">لوحة المرشد</Link>
              {id && <Link to={`/mentors/${id}`} className="hover:text-blue-500 transition border border-blue-300 rounded-5 p-2">الصفحة الشخصية</Link>}
            </>
          )}
          {role === "admin" && (
            <>
              <Link to="/dashboardAdmin" className="hover:text-blue-500 transition border border-blue-300 rounded-5 p-2">لوحة الإدارة</Link>
             
            </>
          )}
          {role === "student" && (
            <Link to="/mentors" className="hover:text-blue-500 transition border border-blue-300 rounded-5 p-2">المرشدين</Link>
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
