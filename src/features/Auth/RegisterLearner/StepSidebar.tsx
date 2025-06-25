interface Props {
  data: any;
}

const StepSidebar = ({ data }: Props) => {
  return (
    <div className="w-[300px] bg-gray-100 p-6 border-l border-gray-200 hidden md:block">
      <div className="text-center">
        <img
          src={data.avatar ||"default-profile.png"}
          alt="avatar"
          className="mx-auto rounded-full mb-2"
        />
        <h3 className="font-semibold text-lg">
          {data.firstName || data.lastName ? `${data.firstName} ${data.lastName}` : "اسم المستخدم"}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {data.specialization || "المجال غير محدد"}
        </p>
      </div>

      <div className="mt-6">
        <h4 className="text-gray-700 font-medium mb-2">نظرة عامة</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>البريد: {data.email || "غير محدد"}</li>
          <li>النوع: {data.gender || "غير محدد"}</li>
          <li>الدولة: {data.country || "غير محدد"}</li>
          <li>التخصص: {data.specialization || "غير محدد"}</li>
          <li>المستوى: {data.educationLevel || "غير محدد"}</li>
        </ul>
      </div>
    </div>
  );
};

export default StepSidebar;