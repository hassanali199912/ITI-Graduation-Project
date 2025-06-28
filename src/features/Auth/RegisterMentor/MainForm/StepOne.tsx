// import { type SubmitHandler, useForm, FormProvider } from "react-hook-form";
// import { alpha, styled } from "@mui/material/styles";
// import InputBase from "@mui/material/InputBase";
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   Box,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import * as React from "react";

// interface FormInput {
//   fullName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   country: string;
//   gender: string; // Corrected to gender instead of country for the type field
//   city: string;
//   phone: string;
//   language: string;
// }

// const BootstrapInput = styled(InputBase)(({ theme }) => ({
//   "label + &": {
//     marginTop: theme.spacing(3),
//   },
//   "& .MuiInputBase-input": {
//     borderRadius: 4,
//     position: "relative",
//     backgroundColor: "#F3F6F9",
//     border: "1px solid",
//     fontSize: 16,
//     width: "100%",
//     padding: "10px 12px",
//     transition: theme.transitions.create([
//       "border-color",
//       "background-color",
//       "box-shadow",
//     ]),
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:focus": {
//       boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
//       borderColor: theme.palette.primary.main,
//     },
//     ...theme.applyStyles("dark", {
//       backgroundColor: "#1A2027",
//       borderColor: "#2D3843",
//     }),
//   },
// }));

// const MainForm: React.FC = () => {
//   const methods = useForm<FormInput>({
//     defaultValues: {
//       fullName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       country: "",
//       gender: "",
//       city: "",
//       phone: "",
//       language: "",
//     },
//   });

//   const {
//     handleSubmit,
//     formState: { errors },
//   } = methods;

//   const onSubmit: SubmitHandler<FormInput> = (data) => {
//     console.log(data);
//   };

//   const [showPassword, setShowPassword] = React.useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (
//     event: React.MouseEvent<HTMLButtonElement>
//   ) => event.preventDefault();
//   const handleClickShowConfirmPassword = () =>
//     setShowConfirmPassword((show) => !show);
//   const handleMouseDownConfirmPassword = (
//     event: React.MouseEvent<HTMLButtonElement>
//   ) => event.preventDefault();

//   return (
//     <FormProvider {...methods}>
//       <Box
//         component="form"
//         onSubmit={handleSubmit(onSubmit)}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 4,
//           padding: 4, // Added padding for better layout
//           backgroundColor: "#fff",
//           borderRadius: 2,
//         }}
//       >
//         <FormControl fullWidth error={!!errors.fullName}>
//           <InputLabel shrink htmlFor="fullName-input">
//             الإسم بالكامل *
//           </InputLabel>
//           <BootstrapInput
//             id="fullName-input"
//             {...methods.register("fullName", { required: "إدخل الإسم" })}
//             placeholder="أدخل الإسم الكامل"
//           />
//           {errors.fullName && (
//             <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
//               {errors.fullName.message}
//             </Box>
//           )}
//         </FormControl>

//         <FormControl fullWidth error={!!errors.email}>
//           <InputLabel shrink htmlFor="email-input">
//             البريد الإلكتروني *
//           </InputLabel>
//           <BootstrapInput
//             id="email-input"
//             type="email"
//             {...methods.register("email", {
//               required: "هذا الحقل إجباري",
//               pattern: /^\S+@\S+\.\S+$/,
//             })}
//             placeholder="أدخل البريد الإلكتروني"
//           />
//           {errors.email && (
//             <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
//               {errors.email?.message ||
//                 (errors.email?.type === "pattern" &&
//                   "أدخل بريدًا إلكترونيًا صالحًا")}
//             </Box>
//           )}
//         </FormControl>

//         <FormControl fullWidth error={!!errors.password}>
//           <InputLabel shrink htmlFor="password-input">
//             كلمة المرور *
//           </InputLabel>
//           <BootstrapInput
//             id="password-input"
//             type={showPassword ? "text" : "password"}
//             {...methods.register("password", {
//               required: "هذا الحقل إجباري",
//               minLength: {
//                 value: 6,
//                 message: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
//               },
//             })}
//             placeholder="أدخل كلمة المرور"
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label={
//                     showPassword ? "hide the password" : "display the password"
//                   }
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   edge="end"
//                   size="small"
//                 >
//                   {showPassword ? (
//                     <VisibilityOff fontSize="small" />
//                   ) : (
//                     <Visibility fontSize="small" />
//                   )}
//                 </IconButton>
//               </InputAdornment>
//             }
//           />
//           {errors.password && (
//             <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
//               {errors.password.message}
//             </Box>
//           )}
//         </FormControl>

//         <FormControl fullWidth error={!!errors.confirmPassword}>
//           <InputLabel shrink htmlFor="confirmPassword-input">
//             تأكيد كلمة المرور *
//           </InputLabel>
//           <BootstrapInput
//             id="confirmPassword-input"
//             type={showConfirmPassword ? "text" : "password"}
//             {...methods.register("confirmPassword", {
//               required: "هذا الحقل إجباري",
//               validate: (value, formValues) =>
//                 value === formValues.password || "كلمتا المرور غير متطابقتان",
//             })}
//             placeholder="أكد كلمة المرور"
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label={
//                     showConfirmPassword
//                       ? "hide the password"
//                       : "display the password"
//                   }
//                   onClick={handleClickShowConfirmPassword}
//                   onMouseDown={handleMouseDownConfirmPassword}
//                   edge="end"
//                   size="small"
//                 >
//                   {showConfirmPassword ? (
//                     <VisibilityOff fontSize="small" />
//                   ) : (
//                     <Visibility fontSize="small" />
//                   )}
//                 </IconButton>
//               </InputAdornment>
//             }
//           />
//           {errors.confirmPassword && (
//             <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
//               {errors.confirmPassword.message}
//             </Box>
//           )}
//         </FormControl>

//         <FormControl fullWidth error={!!errors.country}>
//           <InputLabel shrink htmlFor="country-input">
//             الدولة *
//           </InputLabel>
//           <Select
//             id="country-input"
//             {...methods.register("country", { required: "هذا الحقل إجباري" })}
//             fullWidth
//             displayEmpty
//             renderValue={(selected) =>
//               selected ? selected.toString() : "اختر الدولة"
//             }
//           >
//             <MenuItem value="">
//               <em>اختر الدولة</em>
//             </MenuItem>
//             <MenuItem value="egypt">مصر</MenuItem>
//             <MenuItem value="saudi">السعودية</MenuItem>
//             <MenuItem value="uae">الإمارات</MenuItem>
//           </Select>
//           {errors.country && (
//             <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
//               {errors.country.message}
//             </Box>
//           )}
//         </FormControl>

//         <FormControl fullWidth error={!!errors.gender}>
//           <InputLabel shrink htmlFor="gender-input">
//             النوع *
//           </InputLabel>
//           <Select
//             id="gender-input"
//             {...methods.register("gender", { required: "هذا الحقل إجباري" })} // Corrected to gender
//             fullWidth
//             displayEmpty
//             renderValue={(selected) =>
//               selected ? selected.toString() : "النوع"
//             }
//           >
//             <MenuItem value="">
//               <em>اختر النوع</em>
//             </MenuItem>
//             <MenuItem value="male">ذكر</MenuItem>
//             <MenuItem value="female">أنثى</MenuItem>
//           </Select>
//           {errors.gender && (
//             <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
//               {errors.gender.message}
//             </Box>
//           )}
//         </FormControl>

//         <FormControl fullWidth error={!!errors.city}>
//           <InputLabel shrink htmlFor="city-input">
//             المدينة *
//           </InputLabel>
//           <BootstrapInput
//             id="city-input"
//             {...methods.register("city", { required: "هذا الحقل إجباري" })}
//             placeholder="أدخل المدينة"
//           />
//           {errors.city && (
//             <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
//               {errors.city.message}
//             </Box>
//           )}
//         </FormControl>

//         <FormControl fullWidth error={!!errors.phone}>
//           <InputLabel shrink htmlFor="phone-input">
//             الهاتف *
//           </InputLabel>
//           <BootstrapInput
//             id="phone-input"
//             {...methods.register("phone", {
//               required: "هذا الحقل إجباري",
//               pattern: /^[0-9]{10,}$/,
//             })}
//             placeholder="أدخل رقم الهاتف"
//           />
//           {errors.phone && (
//             <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
//               {errors.phone?.message ||
//                 (errors.phone?.type === "pattern" &&
//                   "أدخل رقم هاتف صالح (10 أرقام على الأقل)")}
//             </Box>
//           )}
//         </FormControl>

//         <FormControl fullWidth error={!!errors.language}>
//           <InputLabel shrink htmlFor="language-input">
//             اللغة *
//           </InputLabel>
//           <Select
//             id="language-input"
//             {...methods.register("language", { required: "هذا الحقل إجباري" })}
//             fullWidth
//             displayEmpty
//             renderValue={(selected) =>
//               selected ? selected.toString() : "اختر اللغة"
//             }
//           >
//             <MenuItem value="">
//               <em>اختر اللغة</em>
//             </MenuItem>
//             <MenuItem value="arabic">العربية</MenuItem>
//             <MenuItem value="english">الإنجليزية</MenuItem>
//           </Select>
//           {errors.language && (
//             <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
//               {errors.language.message}
//             </Box>
//           )}
//         </FormControl>
//       </Box>
//     </FormProvider>

//   );
// };

// export default MainForm;
import React from "react";

export default function StepOne() {
  return (
    <>
      <div className="step-one mx-4">
        <div className="mt-8">
          <p className="text-3xl font-bold">
            ابدأ رحلتك معنا: لنبدأ بالتعرّف عليك!
          </p>
          <p className="text-3xl font-bold">معلومات أساسية</p>
        </div>

        <form action="" className="mb-10 mt-4">
          <div className="flex items-center gap-4">
            <div className="my-8">
              <img
                src="/avatar.png"
                alt=""
                className="h-20 w-20 rounded-full"
              />
            </div>
            <div>
              <p className="font-bold text-base text-blue-500">
                حدد الصوره (اختياري)
              </p>
              <p className="text-base text-gray-500">
                تاكد ان حجم الصوره لا يتعدي 2MB
              </p>
            </div>
          </div>
          <div className="form-control mb-8">
            <label htmlFor="name" className="block text-right mb-2 font-bold">
              الإسم بالكامل
            </label>
            <input
              type="text"
              id="name"
              className="bg-blue-50 p-2 w-full rounded"
              placeholder="محمد جمال أحمد"
            />
          </div>
          <div className="form-control mb-8">
            <label htmlFor="email" className="block text-right mb-2 font-bold">
              البريد الإلكترونى
            </label>
            <input
              type="email"
              className="bg-blue-50 p-2 w-full rounded"
              id="email"
              placeholder="Example@gmail.com"
            />
          </div>
          <div className="flex gap-4">
            <div className="form-control mb-8 w-1/2">
              <label
                htmlFor="password1"
                className="block text-right mb-2 font-bold"
              >
                كلمة المرور
              </label>
              <input
                type="password"
                className="bg-blue-50 p-2 w-full rounded"
                id="password1"
                placeholder="ادخل رقمك السرى"
              />
            </div>
            <div className="form-control mb-8 w-1/2">
              <label
                htmlFor="password2"
                className="block text-right mb-2 font-bold"
              >
                أعد كتابة كلمة المرور
              </label>
              <input
                type="password"
                className="bg-blue-50 p-2 w-full rounded"
                id="password2"
                placeholder="أعد كتابة كلمة السر"
              />
            </div>
          </div>
          <div className="form-control mb-8 ">
            <label htmlFor="type" className="block text-right mb-2 font-bold">
              النوع
            </label>
            <select
              className="appearance-none border w-full mt-2 border-gray-300 rounded px-4 py-2 py-1 text-sm text-gray-600 bg-white custom-select"
              defaultValue=""
            >
              <option value="" disabled>
                النوع
              </option>
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </select>
          </div>
          <div className="form-control mb-8 ">
            <label
              htmlFor="country"
              className="block text-right mb-2 font-bold"
            >
              من اي بلد ؟
            </label>
            <select
              className="appearance-none border w-full mt-2 border-gray-300 rounded px-4 py-2 py-1 text-sm text-gray-600 bg-white custom-select"
              defaultValue=""
            >
              <option value="" disabled>
                مصر
              </option>
              <option value="">السعودية</option>
              <option value="">الإمارات</option>
            </select>
          </div>
          <div className="form-control mb-8 ">
            <label htmlFor="lang" className="block text-right mb-2 font-bold">
              اللغة التى تتحدث بها
            </label>
            <select
              className="appearance-none border w-full mt-2 border-gray-300 rounded px-4 py-2 py-1 text-sm text-gray-600 bg-white custom-select"
              defaultValue=""
            >
              <option value="" disabled>
                Arabic
              </option>
              <option value="">English</option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
}
