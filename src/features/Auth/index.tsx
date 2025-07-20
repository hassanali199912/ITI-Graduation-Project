import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import img1 from '../../assets/images/amico.png';
import { useLazyLoginQuery } from './api/login';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [trigger] = useLazyLoginQuery();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Za-z]/.test(formData.password)) {
      newErrors.password = 'Password must include at least one letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must include at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = 'Password must include at least one symbol';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await trigger({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      console.log("Response from API:", res);

      const token = res?.data?.accessToken;
      const role = res?.data?.roles?.[0];
      const email = res?.data?.email;
      const personId = res?.data?.personId;
      console.log("Response from API:", res);
      if (res?.success && res?.data) {
        const { accessToken, email, personId } = res.data;
      
        localStorage.setItem('accessToken', accessToken || '');
        localStorage.setItem('teacherEmail', email || '');
        localStorage.setItem('teacherId', personId || '');
      
        
      }
      

      if (token) {
        localStorage.setItem("token", token);

        if (role === "Student") {
          localStorage.setItem("studentId", personId);
           window.dispatchEvent(new Event("roleUpdated"));

        } else if (role === "Teacher") {
          localStorage.setItem("teacherId", personId);
           window.dispatchEvent(new Event("roleUpdated"));
        }

        if (email?.toLowerCase() === "demo@gmail.com" && formData.password === "Admin@123") {
          localStorage.setItem("role", "admin");
          window.dispatchEvent(new Event("roleUpdated"));
        } else if (role) {
          localStorage.setItem("role", role.toLowerCase());
          window.dispatchEvent(new Event("roleUpdated"));
          
        }

        navigate("/landingpage");
      } else {
        console.error("Missing token or role in response.");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleGoogleLogin = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const userInfo: any = jwtDecode(credentialResponse.credential);
      console.log("Google User Info:", userInfo);

      // مثال على تخزين بيانات Google Login
      localStorage.setItem("token", credentialResponse.credential);
      localStorage.setItem("email", userInfo.email || "");
      localStorage.setItem("name", userInfo.name || "");

      navigate("/landingpage");
    } else {
      console.error("No credential returned from Google");
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <GoogleOAuthProvider clientId="176619199544-avcb45kd4c6erkb9ibhoms3eqd6nhg4u.apps.googleusercontent.com">
      <div className="flex items-center justify-between min-h-screen bg-white gap-30 border border-gray-200 shadow-md w-full">
        <div className="bg-blue-50 w-[30%] min-h-screen border border-gray-300 shadow-lg flex flex-col items-center justify-center"
          style={{
            borderTopRightRadius: "7rem",
            borderBottomRightRadius: "7rem"
          }}>
          <img src={img1} className="items-center justify-center w-70 h-70" alt="Login visual" />
          <h3 className="text-xl font-bold mb-6 text-black-600 text-center">
            من البداية وحتى الاحتراف، لست وحدك…
            <br /> تعلم، اسأل، وتطوّر مع
            <br /> الدعم الذي تحتاجه، في الوقت الذي تحتاجه
          </h3>
        </div>

        <div className="w-[70%] min-h-screen flex justify-center items-center my-10">
          <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
            <h1 className="text-2xl font-bold mb-6 text-center text-black-600">سجل الدخول لحسابك</h1>
            <p className="mb-6 text-center text-gray-400">الرجاء تسجيل الدخول للمتابعة</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label dir="rtl" className="block m-3 text-right">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                placeholder="Example@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-right"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm text-right">{errors.email}</p>}

              <label dir="rtl" className="block m-3 text-right">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 text-right"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  onClick={togglePassword}
                  className="absolute left-3 top-3 cursor-pointer text-gray-600"
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-sm text-right">{errors.password}</p>}

              <p className="mb-6 text-right text-gray-400">
                يجب أن تكون من 8 حروف وأرقام ورموز على الأقل
              </p>

              <div className="flex justify-between">
                <div className="flex gap-3">
                  <p className="text-gray-400 text-left">تذكرني</p>
                  <input type="checkbox" className="mb-4" />
                </div>
                <a href="/changepassword">
                  <p className="mb-6 text-right text-blue-400">نسيت كلمة السر؟</p>
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                سجل الدخول
              </button>

              <hr />

              <div className="bg-white rounded-lg border border-blue-900 p-2 hover:bg-blue-800 transition duration-200">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  width="100%"
                />
              </div>

              <hr />

              <p className="text-gray-500 text-center">
                ليس لديك حساب ؟
                <a href="/createAccount" className="text-blue-400"> انشاء حساب كمتعلم أو متدرب</a>
              </p>
            </form>
          </div>

        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
