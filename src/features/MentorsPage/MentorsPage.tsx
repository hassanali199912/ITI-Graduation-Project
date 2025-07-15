import React, { useEffect, useState } from "react";
import FiltersInputs from "./components/FiltersInputs";
import MentorsList from "./components/MentorsList";
import { useLazyGetSkillsQuery } from "../Auth/api/lookups";

interface MentorProps {
  firstName: string;
  lastName: string;
  bio: string;
  position: string;
  skills: string[];
  salary: number;
  imgUrl?: string; // علامة ? معناها إنه اختياري
}

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [triggerSkills, { data: skillsData, isLoading, isError }] = useLazyGetSkillsQuery();
  console.log(skillsData, "skills");

  const [allMentors, setAllMentors] = useState<MentorProps[]>([
    {
      firstName: "أحمد",
      lastName: "خالد",
      bio: "مهندس برمجيات بخبرة أكثر من ٨ سنوات في تطوير الأنظمة باستخدام .NET.",
      position: "مهندس برمجيات أول",
      skills: ["C#", ".NET", "SQL", "Azure", "TypeScript", "JavaScript"],
      salary: 120,
      imgUrl: "/person.jpg",
    },
    {
      firstName: "سارة",
      lastName: "محمد",
      bio: "متخصصة في تطوير واجهات المستخدم باستخدام React وتهتم بتحسين تجربة المستخدم.",
      position: "مطورة واجهات أمامية",
      skills: ["React", "Next.js", "TypeScript", "HTML", "CSS", "Jest"],
      salary: 110,
      imgUrl: "/person.jpg",
    },
    {
      firstName: "يوسف",
      lastName: "الزين",
      bio: "مطور متكامل يستخدم Vue وNuxt ويعمل مع الشركات الناشئة في الشرق الأوسط.",
      position: "مطور Full Stack",
      skills: ["Vue", "Nuxt", "Pinia", "Tailwind CSS", "Node.js", "MongoDB"],
      salary: 95,
      imgUrl: "/person.jpg",
    },
    {
      firstName: "ليلى",
      lastName: "عبدالله",
      bio: "مهندسة DevOps تساعد الفرق على أتمتة عمليات النشر والتكامل المستمر.",
      position: "مهندسة DevOps",
      skills: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Go", "Terraform"],
      salary: 130,
      imgUrl: "/person.jpg",
    },
    {
      firstName: "كريم",
      lastName: "سامي",
      bio: "عالم بيانات يركز على معالجة اللغة الطبيعية والتعلم الآلي.",
      position: "مهندس تعلم آلي",
      skills: ["Python", "TensorFlow", "PyTorch", "FastAPI", "GCP", "SQL"],
      salary: 140,
      imgUrl: "/person.jpg",
    },
    {
      firstName: "ندى",
      lastName: "خليل",
      bio: "تهتم بتصميم الواجهات وبناء تجارب مستخدم مميزة باستخدام أدوات حديثة.",
      position: "مطورة واجهات أمامية",
      skills: ["Svelte", "React", "Framer Motion", "Figma", "SCSS", "UX/UI"],
      salary: 105,
      imgUrl: "/person.jpg",
    },
    {
      firstName: "محمود",
      lastName: "شريف",
      bio: "خبير في الحوسبة السحابية ويعمل على نقل الأنظمة القديمة إلى Azure.",
      position: "مهندس حلول Azure",
      skills: ["Azure", ".NET Core", "Bicep", "SQL Server", "Terraform", "C#"],
      salary: 135,
      imgUrl: "/person.jpg",
    },
    {
      firstName: "جميلة",
      lastName: "صالح",
      bio: "تحب الأنظمة عالية الأداء وتستخدم لغة Rust لتطوير خدمات قوية.",
      position: "مهندسة نظم",
      skills: ["Rust", "PostgreSQL", "gRPC", "Redis", "Kafka", "Docker"],
      salary: 125,
      imgUrl: "/person.jpg",
    },
    {
      firstName: "علي",
      lastName: "محمoud",
      bio: "مدرب ومطور Full Stack باستخدام تقنيات MERN ويهتم باختبار الكود.",
      position: "مطور MERN متكامل",
      skills: ["MongoDB", "Express", "React", "Node.js", "Jest", "Cypress"],
      salary: 100,
      imgUrl: "/person.jpg",
    },
    {
      firstName: "ريم",
      lastName: "أمين",
      bio: "متخصصة في أمان التطبيقات وتساعد المطورين على كتابة كود آمن.",
      position: "خبيرة أمن تطبيقات",
      skills: ["OWASP", "نمذجة التهديدات", "Java", "Spring", "Burp Suite", "Linux"],
      salary: 115,
      imgUrl: "/person.jpg",
    },
  ]);

  const toggleSkill = (skill: string) =>
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );

  useEffect(() => {
    triggerSkills();
  }, [triggerSkills]);

  const filteredMentors = allMentors.filter((m) => {
    const matchesSearch =
      !searchQuery ||
      `${m.firstName} ${m.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.every((s) =>
        m.skills.map((sk) => sk.toLowerCase()).includes(s.toLowerCase())
      );

    return matchesSearch && matchesSkills;
  });

  // Safely handle skillsData
  const uniqueSkills: string[] = skillsData
    ? skillsData.map((skill:{ id: string; name: string }) => skill.name) // Remove type cast if possible, rely on RTK Query types
    : [...new Set(allMentors.flatMap((m) => m.skills))].sort();

  return (
    <div dir="rtl" className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <FiltersInputs
            skills={uniqueSkills}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedSkills={selectedSkills}
            onToggleSkill={toggleSkill}
          />
          <main className="flex-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full overflow-y-auto">
              <MentorsList mentors={filteredMentors} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}