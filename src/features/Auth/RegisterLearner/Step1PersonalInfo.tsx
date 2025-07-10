import { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
// import { useLazyGetLookupDataQuery } from "../../Auth/api/lookups";

interface Props {
  data: any;
  setData: (val: any) => void;
  onNext: () => void;
}

const Step1PersonalInfo = ({ data, setData, onNext }: Props) => {
  const genders = ["ذكر", "أنثى"];
  // const countries = ["مصر", "السعودية", "الإمارات", "الأردن"];
  const nationalities = ["مصري", "سعودي", "إماراتي", "أردني"];
  const [preview, setPreview] = useState<string>(data.avatar || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("الصورة يجب ألا تتجاوز 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      setData({ ...data, avatar: base64 });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col bg-white p-8 w-full max-w-5xl">
      <h2 className="text-xl font-bold mb-4 text-gray-700 text-right">
        مرحباً بك! <br />
        أنت على وشك إعداد ملفك الشخصي الجديد
      </h2>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={preview || " /🤖 AI Generated Avatars_ Rohan Sharma.png"}
          alt="preview"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <label className="block text-sm font-medium mb-1 text-[#0003C7]">
            حدد الصورة (اختياري)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block text-sm text-gray-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            تأكد أن حجم الصورة لا يتعدى 2MB
          </p>
        </div>
      </div>

      <form onSubmit={(e) => {e.preventDefault(); onNext();}}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">
            الاسم الأول <span className="text-red-500">*</span>
          </label>
          <TextField
            variant="outlined"
            fullWidth
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            InputProps={{
              style: {
                backgroundColor: "#F4F9FB",
                borderRadius: 8,
                border: "none", 
              },
              notched: false,
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">
            الاسم الأخير <span className="text-red-500">*</span>
          </label>
          <TextField
            variant="outlined"
            fullWidth
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            InputProps={{
              style: {
                backgroundColor: "#F4F9FB",
                borderRadius: 8,
                border: "none", 
              },
              notched: false, 
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
        </div>

        <div className="col-span-2 flex flex-col">
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">
            البريد الإلكتروني <span className="text-red-500">*</span>
          </label>
          <TextField
            type="email"
            variant="outlined"
            fullWidth
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            InputProps={{
              style: {
                backgroundColor: "#F4F9FB",
                borderRadius: 8,
                border: "none", 
              },
              notched: false, 
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">
            كلمة المرور <span className="text-red-500">*</span>
          </label>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            InputProps={{
              style: {
                backgroundColor: "#F4F9FB",
                borderRadius: 8,
                border: "none", 
              },
              notched: false, 
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">
            تأكيد كلمة المرور <span className="text-red-500">*</span>
          </label>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            value={data.confirmPassword}
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
            InputProps={{
              style: {
                backgroundColor: "#F4F9FB",
                borderRadius: 8,
                border: "none", 
              },
              notched: false, 
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
        </div>

        <div className="col-span-2 flex flex-col">
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">
            العمر <span className="text-red-500">*</span>
          </label>
          <TextField
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={data.birthDate}
            onChange={(e) => setData({ ...data, birthDate: e.target.value })}
            InputProps={{
              style: {
                backgroundColor: "#F4F9FB",
                borderRadius: 8,
                border: "none", 
              },
              notched: false, 
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">
            النوع <span className="text-red-500">*</span>
          </label>
          <TextField
            select 

            variant="outlined"
            fullWidth
            value={data.gender}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
            InputProps={{
              style: {

                borderRadius: 8,
              },
            }}
          >
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">
            من أي بلد؟ <span className="text-red-500">*</span>
          </label>
          <TextField
            select
            variant="outlined"
            fullWidth
            value={data.country}
            onChange={(e) => setData({ ...data, country: e.target.value })}
            InputProps={{
              style: {
                borderRadius: 8,
              },
            }}
          >
            {/* {countries.values.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))} */}
            {/* {countries.value} */}
          </TextField>
        </div>

        <div className="col-span-2 flex flex-col">
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">
            ما هي جنسيتك؟ <span className="text-red-500">*</span>
          </label>
          <TextField
            select
            variant="outlined"
            fullWidth
            value={data.nationality}
            onChange={(e) => setData({ ...data, nationality: e.target.value })}
            InputProps={{
              style: {
                borderRadius: 8,
              },
            }}
          >
            {nationalities.map((nat) => (
              <MenuItem key={nat} value={nat}>
                {nat}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="col-span-2 flex justify-between mt-6 items-center">
          <button
            type="button"
            className="flex items-center gap-2 text-[#0003C7] font-medium"
          >
            <img src="/arrow-right.png" alt="" />
            رجوع
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-[#0003C7] text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            استمرار
            <img src="/arrow-left.png" alt="" />
          </button>
        </div>
        <div className="col-span-2 flex justify-center mt-6">
          <p className="text-base text-[#A3A3A3] text-center">
            لديك حساب؟{" "}
            <span
              className="cursor-pointer text-[#A3A3A3] hover:text-[#0003C7] transition"
              onClick={() => window.location.href = "/login"} 
            >
              سجل دخول
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Step1PersonalInfo;