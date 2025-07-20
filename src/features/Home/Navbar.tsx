import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

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
    setRole(null);
    navigate("/");
  };

  return (
    <header dir="rtl" className="bg-white shadow-sm z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src="/logo.svg" alt="logo" className="w-28 h-auto" />
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center items-center gap-3 text-blue-900 font-medium text-base">
          {(role === "teacher" || role === "admin" || role === "student") && (
            <Link
              to="/landingpage"
              className="transition duration-200 hover:text-white px-3 py-1.5 rounded-md border border-blue-300 hover:bg-blue-800"
            >
              الرئيسية
            </Link>
          )}

          {/* Role-specific links */}
          {role === "teacher" && (
            <>
              <Link
                to="/dashboardMentor"
                className="transition hover:text-white border border-blue-300 px-3 py-1.5 rounded-md hover:bg-blue-800"
              >
                لوحة المرشد
              </Link>
              {id && (
                <Link
                  to={`/mentors/${id}`}
                  className="transition hover:text-white border border-blue-300 px-3 py-1.5 rounded-md hover:bg-blue-800"
                >
                  الصفحة الشخصية
                </Link>
              )}
            </>
          )}

          {role === "admin" && (
            <Link
              to="/dashboardAdmin"
              className="transition hover:text-white border border-blue-300 px-3 py-1.5 rounded-md hover:bg-blue-800"
            >
              لوحة الإدارة
            </Link>
          )}

          {role === "student" && (
            <>
              <Link
                to="/mentors"
                className="transition hover:text-white border border-blue-300 px-3 py-1.5 rounded-md hover:bg-blue-800"
              >
                المرشدين
              </Link>
              <Link
                to="/sessions"
                className="transition hover:text-white border border-blue-300 px-3 py-1.5 rounded-md hover:bg-blue-800"
              >
                متابعة جلســـاتى
              </Link>
              <Link
                to="/points"
                className="transition hover:text-white border border-blue-300 px-3 py-1.5 rounded-md hover:bg-blue-800"
              >
                خطط النقــــاط
              </Link>
            </>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {role ? (
            <Button
              onClick={handleLogout}
              variant="contained"
              color="error"
              endIcon={<ExitToAppIcon />}
              className="!rounded-lg !font-bold"
            >
              تسجيل الخروج
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/home')}
                startIcon={<LoginIcon />}
                className="!rounded-lg !font-semibold"
              >
                سجل الدخول
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/createAccount')}
                startIcon={<PersonAddIcon />}
                className="!rounded-lg !font-semibold"
              >
                انشاء حساب
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
