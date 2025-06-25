import { useState } from "react";
import { TextField, MenuItem } from "@mui/material";

interface Props {
  data: any;
  setData: (val: any) => void;
  onNext: () => void;
}

const Step1PersonalInfo = ({ data, setData, onNext }: Props) => {
  const genders = ["ذكر", "أنثى"];
  const countries = ["مصر", "السعودية", "الإمارات", "الأردن"];
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
    <div className="flex flex-col bg-white rounded-lg shadow-md p-8 w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4 text-gray-700 text-right">
        مرحباً بك! <br />
        أنت على وشك إعداد ملفك الشخصي الجديد
      </h2>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={preview || "default-profile.png"}
          alt="preview"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            حدد الصورة <span className="text-gray-400">(اختياري)</span>
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <TextField
          label="الاسم الأول"
          fullWidth
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
        />
        <TextField
          label="الاسم الأخير"
          fullWidth
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
        />
        <TextField
          label="البريد الإلكتروني"
          type="email"
          fullWidth
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <TextField
          label="كلمة المرور"
          type="password"
          fullWidth
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <TextField
          label="تأكيد كلمة المرور"
          type="password"
          fullWidth
          value={data.confirmPassword}
          onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
        />
        <TextField
          label="العمر"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={data.birthDate}
          onChange={(e) => setData({ ...data, birthDate: e.target.value })}
        />
        <TextField
          label="النوع"
          select
          fullWidth
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
        >
          {genders.map((gender) => (
            <MenuItem key={gender} value={gender}>
              {gender}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="من أي بلد؟"
          select
          fullWidth
          value={data.country}
          onChange={(e) => setData({ ...data, country: e.target.value })}
        >
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="ما هي جنسيتك؟"
          select
          fullWidth
          value={data.nationality}
          onChange={(e) => setData({ ...data, nationality: e.target.value })}
        >
          {nationalities.map((nat) => (
            <MenuItem key={nat} value={nat}>
              {nat}
            </MenuItem>
          ))}
        </TextField>

        <div className="col-span-2 flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            استمرار
          </button>
          <button type="button" className="text-blue-600 underline">
            رجوع
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1PersonalInfo;