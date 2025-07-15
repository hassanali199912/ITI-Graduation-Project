// ------------- Mentor.tsx -------------
// interface MentorProps {
//   firstName: string;
//   lastName: string;
//   bio: string;
//   position: string;
//   skills: string[];
//   salary: number;
//   imgUrl?: string;
//   compact?: boolean;              // ← جديد
// }

import { Box, Skeleton } from "@mui/material";
import type { Skill, Teacher } from "../../Auth/RegisterMentor/types";
interface MentorCardProps extends Partial<Teacher> {
  loading?: boolean;
  compact?: boolean;
}
export default function Mentor(props: MentorCardProps) {
   const {
    firstName,
    lastName,
    bio,
    stutas,
    skills,   
    salary,
    profilePictureUrl,
    compact = false,
    loading = false,
  } = props;
  
  /* حجم العناصر يتغيّر لو compact */
  const imgH = compact ? "h-32" : "h-60";
  const nameSize = compact ? "text-lg" : "text-2xl";
  const bioShown = compact ? bio?.slice(0, 60) + "..." : bio; // اختصار
  if (loading) {
    /* Skeleton كارت */
    return (
      <Box sx={{ width: compact ? 220 : 300, p: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={compact ? 100 : 160} />
        <Skeleton sx={{ mt: 1 }} />
        <Skeleton width="60%" />
      </Box>
    );
  }
 

  return (
    <div
      dir="rtl"
      className={`relative box p-4 transition-all duration-150 border border-gray-300 rounded-lg shadow-sm ${
        compact ? "max-w-xs" : "max-w-4xl"
      } mx-auto`}
    >
      <img
        src={profilePictureUrl || "/avatar.png"}
        alt="Mentor"
        className={`w-full ${imgH} object-cover rounded-md mb-3`}
      />

      <h3 className={`${nameSize} font-bold text-gray-900 mb-1`}>
        {firstName} {lastName}
      </h3>

      <p className="text-xs text-gray-600 mb-2">{bio}</p>

      <p className="text-xs leading-5 mb-3">{bioShown}</p>

      <div className="flex flex-wrap gap-2 mb-4 justify-end">
        {skills?.map((skill:Skill) => (
          <span
            key={skill.skillId}
            className="bg-blue-100 text-gray-800 text-[10px] font-medium px-2 py-0.5 rounded-full"
          >
            {skill.skillName}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold">
          ${salary}
          <span className="text-[10px] text-gray-500"> / شهر</span>
        </span>
        <a
          href="#"
          className="text-[10px] bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
        >
          عرض الملف
        </a>
      </div>
    </div>
  );
}
