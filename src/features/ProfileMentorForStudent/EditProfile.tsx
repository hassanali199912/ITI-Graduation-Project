import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const originalData = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true); 
const id=localStorage.getItem("teacherId");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    profilePictureUrl: "",
    countryId: "",
    gender: 0,
    bio: "",
    salary: 0,
    additionalInterests: [""],
    educations: [
      {
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    certificates: [
      {
        name: "",
        certificateUrl: "",
        issuedBy: "",
        issuedDate: "",
        examResult: "",
      },
    ],
    skills: [{ skillId: "" }],
    teachingAreaIds: [""],
    ageGroupIds: [""],
    communicationMethodIds: [""],
    teachingLanguageIds: [""],
  });
  const [countries, setCountries] = useState<{ id: string; name: string }[]>([]);

useEffect(() => {
  const token = localStorage.getItem("token");

  fetch(`http://academix1.runasp.net/api/teachers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const data = res.data;

      const transformedData = {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        profilePictureUrl: data.profilePictureUrl || "",
        countryId: "", 
        gender: 0, 
        bio: data.bio || "",
        salary: data.salary || 0,
        additionalInterests: [""], 
        educations: data.teacherEducations?.length
          ? data.teacherEducations
          : [
              {
                institution: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
        certificates: data.certificates?.length
          ? data.certificates
          : [
              {
                name: "",
                certificateUrl: "",
                issuedBy: "",
                issuedDate: "",
                examResult: "",
              },
            ],
        skills: data.skills?.length
          ? data.skills
          : [{ skillId: "" }],
        teachingAreaIds: data.specialists?.length
          ? data.specialists.map((s: any) => s.id) 
          : [""],
        ageGroupIds: [""],
        communicationMethodIds: [""],
        teachingLanguageIds: [""],
      };

      setForm(transformedData);
      originalData.current = transformedData;
      setIsLoading(false);
    })
    .catch((err) => {
      console.error("Error loading profile", err);
      setIsLoading(false);
    });
}, []);

useEffect(() => {
  fetch('http://academix1.runasp.net/api/lookups/countries')
    .then(res => res.json())
    .then(res => setCountries(res.data || []));
}, []);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    arrayName: keyof typeof form,
    index: number,
    field: string
  ) => {
    const updated = [...(form[arrayName] as any[])];
    updated[index][field] = e.target.value;
    setForm({ ...form, [arrayName]: updated });
  };

  const handleIdArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    arrayName: keyof typeof form,
    index = 0
  ) => {
    const updated = [...(form[arrayName] as string[])];
    updated[index] = e.target.value;
    setForm({ ...form, [arrayName]: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!originalData.current) {
      console.warn("Original data not loaded");
      return;
    }

    const updatedFields: any = {};
    Object.keys(form).forEach((key) => {
      const current = form[key as keyof typeof form];
      const original = originalData.current[key];
      if (JSON.stringify(current) !== JSON.stringify(original)) {
        updatedFields[key] = current;
      }
    });

    try {
      const response = await fetch("http://academix1.runasp.net/api/teachers/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        console.error("Update failed", response.status);
        return;
      }

      const data = await response.json();
      console.log("Success:", data);
      navigate(`/mentors/${id}`);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

 
  if (isLoading) {
    return <p className="text-center text-gray-500 py-10">جاري تحميل البيانات...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto space-y-6 border border-gray-100 mt-8"
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">تعديل الملف الشخصي</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-1">الاسم الأول</label>
          <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">اسم العائلة</label>
          <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 mb-1">رابط صورة الملف الشخصي</label>
          <input name="profilePictureUrl" placeholder="Profile Picture URL" value={form.profilePictureUrl} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">الجنس</label>
          <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none">
            <option value={0}>Male</option>
            <option value={1}>Female</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">الدولة</label>
          <select
            name="countryId"
            value={form.countryId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="">اختر الدولة</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 mb-1">نبذة عنك</label>
          <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none min-h-[80px]" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">الراتب</label>
          <input name="salary" type="number" placeholder="Salary" value={form.salary} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">اهتمامات إضافية</label>
          <input value={form.additionalInterests?.[0] || ""} placeholder="Interest" onChange={(e) => setForm({ ...form, additionalInterests: [e.target.value] })} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none" />
        </div>
      </div>

      <div className="pt-6">
        <h3 className="font-bold text-lg text-blue-600 mb-2">التعليم</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["institution", "degree", "field", "startDate", "endDate", "description"].map((field) => (
            <input
              key={field}
              placeholder={field}
              value={(form.educations?.[0] as any)?.[field] || ""}
              onChange={(e) => handleArrayChange(e, "educations", 0, field)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          ))}
        </div>
      </div>

      <div className="pt-6">
        <h3 className="font-bold text-lg text-blue-600 mb-2">الشهادات</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["name", "certificateUrl", "issuedBy", "issuedDate", "examResult"].map((field) => (
            <input
              key={field}
              placeholder={field}
              value={(form.certificates?.[0] as any)?.[field] || ""}
              onChange={(e) => handleArrayChange(e, "certificates", 0, field)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          ))}
        </div>
      </div>

      <div className="pt-6">
        <h3 className="font-bold text-lg text-blue-600 mb-2">المهارات</h3>
        <input
          placeholder="Skill ID"
          value={form.skills?.[0]?.skillId || ""}
          onChange={(e) => handleArrayChange(e, "skills", 0, "skillId")}
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {["teachingAreaIds", "ageGroupIds", "communicationMethodIds", "teachingLanguageIds"].map((arrayName) => (
          <div key={arrayName}>
            <label className="block text-gray-700 mb-1">{arrayName}</label>
            <input
              placeholder={arrayName}
              value={(form[arrayName as keyof typeof form] as string[])?.[0] || ""}
              onChange={(e) => handleIdArrayChange(e, arrayName as keyof typeof form)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between pt-8 gap-4">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition">حفظ</button>
        <button type="button" onClick={() => navigate(`/mentors/${id}`)} className="text-red-500 underline font-semibold">إلغاء</button>
      </div>
    </form>
  );
};

export default EditProfile;
