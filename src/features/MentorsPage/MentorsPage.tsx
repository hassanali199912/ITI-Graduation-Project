import React, { useEffect, useState, useMemo } from "react";
import FiltersInputs from "./components/FiltersInputs";
import MentorsList   from "./components/MentorsList";
import { useLazyGetSkillsQuery }   from "../Auth/api/lookups";
import { useLazyGetMentorsQuery }  from "../Auth/api/mentorsApi";
import type { Teacher } from "../Auth/RegisterMentor/types";
import { CustomPagination } from "../../shared/components/pagination/CustomPagination";

export default function MentorsPage() {
  const [searchQuery, setSearchQuery]       = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [page, setPage]= useState(1);   
  const [pageSize]= useState(10);  


  /* ـــــــــــــ API calls ـــــــــــــ */
  const [triggerSkills,  { data: skillsData }]       = useLazyGetSkillsQuery();
  const [triggerMentors, { data: mentorsRes, isFetching }] = useLazyGetMentorsQuery();

  /* ـــــــــــــ load once ـــــــــــــ */
  useEffect(() => {
    triggerSkills();
    triggerMentors({ pageNumber: page, pageSize: 6, orderByRating: true });
  }, [triggerSkills, triggerMentors ,page, pageSize]);

  /* ـــــــــــــ raw data ـــــــــــــ */
  const mentors: Teacher[] = mentorsRes?.data.teachers ?? [];
  const totalCount  = mentorsRes?.data.totalCount  ?? 0;
const totalPages  = mentorsRes?.data.totalPages  // يرجع 2 من الـ backend
                  ?? Math.max(1, Math.ceil(totalCount / pageSize));
  console.log(totalCount , totalPages)
  const handleSearch = (val: string) => {
    setPage(1);
    setSearchQuery(val);
  };

  /* ـــــــــــــ unique skills list (strings) ـــــــــــــ */
const availableSkills: string[] = useMemo(() => {
  if (skillsData?.value) {
    return skillsData.value
      .map((s: { name: string }) => s.name?.trim())
      .filter((n : string): n is string => !!n && n !== "")
      .map((n: string) => n.toLowerCase())       
      .sort();
  }

  // fallback
  return Array.from(
    new Set(
      mentors.flatMap((m) =>
        m.skills.map((sk) => sk.skillName.toLowerCase())
      )
    )
  ).sort();
}, [skillsData, mentors]);

  /* ـــــــــــــ toggle skill ـــــــــــــ */
  const toggleSkill = (skill: string) =>
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );

  /* ـــــــــــــ apply filters ـــــــــــــ */
  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      const fullName = `${m.firstName} ${m.lastName}`.toLowerCase();
      const skillNames = m.skills.map((sk) => sk.skillName.toLowerCase());
      const matchesSearch =
        !searchQuery ||
        fullName.includes(searchQuery.toLowerCase()) ||
        skillNames.some((n) => n.includes(searchQuery.toLowerCase()));

      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.every((s) => skillNames.includes(s.toLowerCase()));

      return matchesSearch && matchesSkills;
    });
  }, [mentors, searchQuery, selectedSkills]);

  /* ـــــــــــــ UI ـــــــــــــ */
  return (
    <div dir="rtl" className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <FiltersInputs
            skills={availableSkills}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedSkills={selectedSkills}
            onToggleSkill={toggleSkill}
          />

          <main className="flex-1">
  <div className="rounded-xl p-6 h-full overflow-y-auto space-y-6">

    
<MentorsList mentors={mentors} loading={isFetching} />

    {/* Pagination */}
    {totalPages > 1 && (
      <CustomPagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          window.scrollTo({ top: 0, behavior: "smooth" }); // اختيارى
          setPage(newPage);
        }}
      />
    )}
  </div>
</main>
        </div>
      </div>
    </div>
  );
}
