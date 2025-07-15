import { TextField } from "@mui/material";
import type RegisterFormData from "../../../domain/types/RegisterFormData";
import { useRegisterMutation } from "../../../redux/api/authApi";


interface Props {
  data: RegisterFormData;
  setData: (val: RegisterFormData) => void;
  onBack: () => void;
}

const Step4Intro = ({ data, setData, onBack }: Props) => {
  const [register, { isLoading }] = useRegisterMutation();

  return (
    <div className="flex flex-col bg-white p-8 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-2 text-[#000000] text-right">نبذة تعريفية</h2>
      <p className="text-sm text-[#A3A3A3] mb-8 text-right">هدفها: بناء ملف تعريفي يبان للمدربين.</p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("🚀 Final form data to be sent:", data);
          try {
            const response = await register(data).unwrap();
            console.log("✅ Response from API:", response);
      
            alert("تم إنشاء الحساب بنجاح!");
            window.location.href = "/";
          } catch (error: any) {
            console.error("❌ Error from API:", error); // ✅ اطبعي الخطأ
            console.log("❌ Full error object:", JSON.stringify(error, null, 2));
          }
        }}
        className="grid grid-cols-1 gap-4"
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">
            نبذه عنك
          </label>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            placeholder="أخبرنا عنك، أهدافك، وماذا تفعل"
            value={data.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
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
            رابط GitHub أو LinkedIn (اختياري)
          </label>
          <TextField
            variant="outlined"
            fullWidth
            value={data.github}
            placeholder="example/linkedin"
            onChange={(e) => setData({ ...data, github: e.target.value })}
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

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-[#0003C7] font-medium"
          >
            <img src="/arrow-right.png" alt="" />
            رجوع
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-[#0003C7] text-white px-6 py-2 rounded hover:bg-blue-800 disabled:opacity-50"
          >
            {isLoading ? "جارٍ الإرسال..." : "استمرار"}
            <img src="/arrow-left.png" alt="" />
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <p className="text-base text-[#A3A3A3] text-center">
            لديك حساب؟{" "}
            <span
              className="cursor-pointer text-[#A3A3A3] hover:text-[#0003C7] transition"
              onClick={() => window.location.href = "/"} 
            >
              سجل دخول
            </span>
          </p>
        </div>

      </form>
    </div>
  );
};

export default Step4Intro;