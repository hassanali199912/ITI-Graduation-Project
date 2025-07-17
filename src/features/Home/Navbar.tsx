import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

 const id=localStorage.getItem("teacherId");
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

 
  useEffect(() => {
  const storedRole = localStorage.getItem("role");
  setRole(storedRole);


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
    <div dir="rtl">
      <div className="flex justify-between items-center px-6 py-4 shadow bg-white-500">
        <img src="./logo.svg" alt="logo" className="w-24 h-auto" />

        <div className="flex items-center gap-6 text-blue-800 font-semibold text-lg">
          <Link to="/landingpage" className="hover:text-blue-500 transition border border-blue-300 rounded-5 p-2">الرئيسية</Link>

          {role === "teacher" && (
            <>
              <Link to="/dashboardMentor" className="hover:text-blue-500 transition border border-blue-300 rounded-5 p-2">لوحة المرشد</Link>
              <Link to={`/mentors/${id}`} className="hover:text-blue-500 transition border border-blue-300 rounded-5 p-2">الصفحة الشخصية </Link>
            </>
          )}

          {role === "admin" && (
            <>
              <Link to="/dashboardAdmin" className="hover:text-blue-500 transition border border-blue-300 rounded-5 p-2">لوحة الإدارة</Link>
              <Link to="/dashboardMentor" className="hover:text-blue-500 transition border border-blue-300 rounded-5 p-2">لوحة المرشد</Link>
            </>
          )}

          {role === "student" && (
            <Link to="/mentors" className="hover:text-blue-500 transition border border-blue-300 rounded-5 p-2">المرشدين</Link>
          )}
        </div>

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
    </div>
  );
};

export default Navbar;
