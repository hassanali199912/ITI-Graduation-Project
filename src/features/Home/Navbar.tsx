import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

<<<<<<< HEAD
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

=======
>>>>>>> 197fe260aef18e4512e1a43be388f0d0b1196255
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 197fe260aef18e4512e1a43be388f0d0b1196255
        </div>
      </div>
    </header>
  );
};

export default Navbar;
