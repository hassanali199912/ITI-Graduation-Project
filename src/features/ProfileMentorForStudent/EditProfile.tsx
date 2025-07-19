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
      className="p-6 bg-gray-100 rounded-lg max-w-3xl mx-auto space-y-4"
    >
      <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="profilePictureUrl" placeholder="Profile Picture URL" value={form.profilePictureUrl} onChange={handleChange} className="w-full p-2 border rounded" />

      <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 border rounded">
        <option value={0}>Male</option>
        <option value={1}>Female</option>
      </select>

      <input name="countryId" placeholder="Country ID" value={form.countryId} onChange={handleChange} className="w-full p-2 border rounded" />
      <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="salary" type="number" placeholder="Salary" value={form.salary} onChange={handleChange} className="w-full p-2 border rounded" />

      <input value={form.additionalInterests?.[0] || ""} placeholder="Interest" onChange={(e) => setForm({ ...form, additionalInterests: [e.target.value] })} className="w-full p-2 border rounded" />

      <h3 className="font-bold mt-4">Education</h3>
      {["institution", "degree", "field", "startDate", "endDate", "description"].map((field) => (
        <input
          key={field}
          placeholder={field}
          value={(form.educations?.[0]?.institution || "" as any)[field]}
          onChange={(e) => handleArrayChange(e, "educations", 0, field)}
          className="w-full p-2 border rounded"
        />
      ))}

      <h3 className="font-bold mt-4">Certificate</h3>
      {["name", "certificateUrl", "issuedBy", "issuedDate", "examResult"].map((field) => (
        <input
          key={field}
          placeholder={field}
          value={(form.certificates?.[0] as any)?.[field] || ""}

          onChange={(e) => handleArrayChange(e, "certificates", 0, field)}
          className="w-full p-2 border rounded"
        />
      ))}

      <input
  placeholder="Skill ID"
  value={form.skills?.[0]?.skillId || ""}
  onChange={(e) => handleArrayChange(e, "skills", 0, "skillId")}
  className="w-full p-2 border rounded"
/>


      {["teachingAreaIds", "ageGroupIds", "communicationMethodIds", "teachingLanguageIds"].map((arrayName) => (
        <input
          key={arrayName}
          placeholder={arrayName}
         value={(form[arrayName as keyof typeof form] as string[])?.[0] || ""}

          onChange={(e) => handleIdArrayChange(e, arrayName as keyof typeof form)}
          className="w-full p-2 border rounded"
        />
      ))}

      <div className="flex justify-between pt-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        <button type="button" onClick={() => navigate(`/mentors/${id}`)} className="text-red-500 underline">Cancel</button>
      </div>
    </form>
  );
};

export default EditProfile;
