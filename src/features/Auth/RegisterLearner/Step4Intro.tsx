import { TextField } from "@mui/material";

interface Props {
  data: any;
  setData: (val: any) => void;
  onBack: () => void;
}

const Step4Intro = ({ data, setData, onBack }: Props) => {
  return (
    <div className="flex flex-col bg-white p-8 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-2 text-[#000000] text-right">نبذة تعريفية</h2>
      <p className="text-sm text-[#A3A3A3] mb-8 text-right">هدفها: بناء ملف تعريفي يبان للمدربين.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("تم إنشاء الحساب بنجاح!");
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
            value={data.about}
            onChange={(e) => setData({ ...data, about: e.target.value })}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            رجوع
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-[#0003C7] text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            استمرار
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="flex justify-center mt-6">
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

export default Step4Intro;