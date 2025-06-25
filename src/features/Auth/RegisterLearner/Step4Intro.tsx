import { TextField } from "@mui/material";

interface Props {
  data: any;
  setData: (val: any) => void;
  onBack: () => void;
}

const Step4Intro = ({ data, setData, onBack }: Props) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-8 w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-6 text-gray-700 text-right">نبذة تعريفية</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("تم إنشاء الحساب بنجاح!");
        }}
        className="grid grid-cols-1 gap-4"
      >
        <TextField
          label="نبذة عنك - أخبرنا عنك، أهدافك، وماذا تفعل"
          fullWidth
          multiline
          rows={4}
          value={data.about}
          onChange={(e) => setData({ ...data, about: e.target.value })}
        />

        <TextField
          label="رابط GitHub أو LinkedIn (اختياري)"
          fullWidth
          value={data.github}
          onChange={(e) => setData({ ...data, github: e.target.value })}
        />

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
          >
            رجوع
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            إنهاء
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4Intro;