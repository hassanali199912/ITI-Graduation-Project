import { useState } from "react";
//import image1 from "../assets/images/Avatar1.png"
import type RegisterFormData from "../../../domain/types/RegisterFormData";

interface Props {
  data: RegisterFormData;
  countries: { id: string; name: string }[];
  specialists: { id: string; name: string }[];
  graduationStatuses: { id: string; name: string }[];
  skills: { id: string; name: string }[];
  genders: { id: number; name: string }[];
}

const StepSidebar = ({ data, countries, specialists, graduationStatuses, skills, genders }: Props) => {
  const [activeTab, setActiveTab] = useState("overview");
  const countryCodeMap: { [key: string]: string } = {
    "مصر": "EG",
    "السعودية": "SA",
    "الإمارات": "AE",
    "الأردن": "JO",
  };

  const getNameById = (
    list: { id: string | number; name: string }[],
    id: string | number
  ) => {
    return list.find(item => String(item.id) === String(id))?.name || "غير محددة";
  };
  
  

  const countryCode = data.residenceCountryId ? countryCodeMap[data.residenceCountryId] || "" : "";

  return (
    <div className="w-[500px] bg-white border-l border-gray-200 shadow-md hidden md:block">
      <div className="h-[200px] bg-[#F4F9FB]"></div>
      <div className="p-6">
        <div className="flex gap-4 mt-[-60px]">
          <img
            src={data.profilePictureUrl || " /🤖 AI Generated Avatars_ Rohan Sharma.png"}
            alt="avatar"
            className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-md"
          />
          <div className="mt-15">
            <div className="flex items-start gap-1">
              <h3 className="font-semibold text-lg text-[#0003C7]">
                {data.firstName || data.lastName
                  ? `${data.firstName} ${data.lastName}`
                  : "اسم المستخدم"}
              </h3>
              {countryCode && (
                <span className="text-sm font-semibold text-[#21272A] relative -top-1">{countryCode}</span>
              )}
            </div>

            {data.specialistId ? (
              <p className="text-lg text-gray-500 mt-2">{getNameById(specialists, data.specialistId)}</p>
            ) : (
              <img
                src="/Rectangle 40.png"
                alt="bar"
                className="mt-2 w-70 h-12 object-contain"
              />
            )}
          </div>
        </div>

        <div className="mt-10">
          <div className="flex border-b border-gray-300">
            <button
              className={`w-1/2 text-center py-2 font-medium text-sm ${activeTab === "overview"
                ? "text-[#0003C7] border-b-2 border-[#0003C7]"
                : "text-[#A3A3A3]"
                }`}
              onClick={() => setActiveTab("overview")}
            >
              نظرة عامة
            </button>
            <button
              className={`w-1/2 text-center py-2 font-medium text-sm ${activeTab === "personal"
                ? "text-[#0003C7] border-b-2 border-[#0003C7]"
                : "text-[#A3A3A3]"
                }`}
              onClick={() => setActiveTab("personal")}
            >
              معلومات شخصية
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="mt-6">
              {data.bio ? (
                <div className="bg-[#F4F9FB] rounded-lg p-4 mt-4">
                  <p className="text-base text-[#4B5563] leading-relaxed text-right">
                    {data.bio}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <img src="/Rectangle 40.png" alt="loading bar 1" className="w-80 h-14 object-contain" />
                  <img src="/Rectangle 40.png" alt="loading bar 2" className="w-80 h-14 object-contain" />
                  <img src="/Rectangle 40.png" alt="loading bar 3" className="w-80 h-14 object-contain" />
                </div>
              )}
            </div>
          )}

          {activeTab === "personal" && (
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#A3A3A3]">البريد:</span> {data.email ? (
                  <p className="text-lg text-gray-500 ">{data.email}</p>
                ) : (
                  <img
                    src="/Rectangle 40.png"
                    alt="bar"
                    className="mt-2 w-45 h-2 object-contain"
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#A3A3A3]">النوع:</span> {data.gender !== null && data.gender !== undefined ? (
                  <p className="text-lg text-gray-500 ">{getNameById(genders, data.gender)}</p>
                ) : (
                  <img
                    src="/Rectangle 40.png"
                    alt="bar"
                    className="mt-2 w-45 h-2 object-contain"
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#A3A3A3]">الدولة:</span> {data.residenceCountryId ? (
                  <p className="text-lg text-gray-500 ">{getNameById(countries, data.residenceCountryId)}</p>
                ) : (
                  <img
                    src="/Rectangle 40.png"
                    alt="bar"
                    className="mt-2 w-45 h-2 object-contain"
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#A3A3A3]">التخصص:</span> {data.specialistId ? (
                  <p className="text-lg text-gray-500 ">{getNameById(specialists, data.specialistId)}</p>
                ) : (
                  <img
                    src="/Rectangle 40.png"
                    alt="bar"
                    className="mt-2 w-45 h-2 object-contain"
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#A3A3A3]">المستوى الدراسي:</span> {data.graduationStatusId ? (
                  <p className="text-lg text-gray-500 ">{getNameById(graduationStatuses, data.graduationStatusId)}</p>
                ) : (
                  <img
                    src="/Rectangle 40.png"
                    alt="bar"
                    className="mt-2 w-45 h-2 object-contain"
                  />
                )}
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <span className="font-medium text-[#A3A3A3]">المهارات:</span>
                {Array.isArray(data.skills) && data.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {data.skills.map((skillObj: { skillId: string }, index: number) => {
                      const skillName = getNameById(skills, skillObj.skillId);
                      return (
                        <span
                          key={skillObj.skillId}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs"
                        >
                          {skillName}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <img
                    src="/Rectangle 40.png"
                    alt="bar"
                    className="mt-2 w-45 h-2 object-contain"
                  />
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepSidebar;