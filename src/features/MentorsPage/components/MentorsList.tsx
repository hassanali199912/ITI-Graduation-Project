// import React, { useState } from 'react';
// import Mentor from './Mentor'
// export default function MentorsList() {
// const [mentors, setMentors] = useState([
//   {
//     firstName: 'أحمد',
//     lastName: 'خالد',
//     bio: 'مهندس برمجيات بخبرة أكثر من ٨ سنوات في تطوير الأنظمة باستخدام .NET.',
//     position: 'مهندس برمجيات أول',
//     skills: ['C#', '.NET', 'SQL', 'Azure', 'TypeScript', 'JavaScript'],
//     salary: 120,
//     imgUrl : '/person.jpg'
//   },
//   {
//     firstName: 'سارة',
//     lastName: 'محمد',
//     bio: 'متخصصة في تطوير واجهات المستخدم باستخدام React وتهتم بتحسين تجربة المستخدم.',
//     position: 'مطورة واجهات أمامية',
//     skills: ['React', 'Next.js', 'TypeScript', 'HTML', 'CSS', 'Jest'],
//     salary: 110,
//     imgUrl : '/person.jpg'

//   },
//   {
//     firstName: 'يوسف',
//     lastName: 'الزين',
//     bio: 'مطور متكامل يستخدم Vue وNuxt ويعمل مع الشركات الناشئة في الشرق الأوسط.',
//     position: 'مطور Full Stack',
//     skills: ['Vue', 'Nuxt', 'Pinia', 'Tailwind CSS', 'Node.js', 'MongoDB'],
//     salary: 95,
//     imgUrl : '/person.jpg'

//   },
//   {
//     firstName: 'ليلى',
//     lastName: 'عبدالله',
//     bio: 'مهندسة DevOps تساعد الفرق على أتمتة عمليات النشر والتكامل المستمر.',
//     position: 'مهندسة DevOps',
//     skills: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Go', 'Terraform'],
//     salary: 130,
//     imgUrl : '/person.jpg'

//   },
//   {
//     firstName: 'كريم',
//     lastName: 'سامي',
//     bio: 'عالم بيانات يركز على معالجة اللغة الطبيعية والتعلم الآلي.',
//     position: 'مهندس تعلم آلي',
//     skills: ['Python', 'TensorFlow', 'PyTorch', 'FastAPI', 'GCP', 'SQL'],
//     salary: 140,
//     imgUrl : '/person.jpg'

//   },
//   {
//     firstName: 'ندى',
//     lastName: 'خليل',
//     bio: 'تهتم بتصميم الواجهات وبناء تجارب مستخدم مميزة باستخدام أدوات حديثة.',
//     position: 'مطورة واجهات أمامية',
//     skills: ['Svelte', 'React', 'Framer Motion', 'Figma', 'SCSS', 'UX/UI'],
//     salary: 105,
//     imgUrl : '/person.jpg'

//   },
//   {
//     firstName: 'محمود',
//     lastName: 'شريف',
//     bio: 'خبير في الحوسبة السحابية ويعمل على نقل الأنظمة القديمة إلى Azure.',
//     position: 'مهندس حلول Azure',
//     skills: ['Azure', '.NET Core', 'Bicep', 'SQL Server', 'Terraform', 'C#'],
//     salary: 135,
//     imgUrl : '/person.jpg'

//   },
//   {
//     firstName: 'جميلة',
//     lastName: 'صالح',
//     bio: 'تحب الأنظمة عالية الأداء وتستخدم لغة Rust لتطوير خدمات قوية.',
//     position: 'مهندسة نظم',
//     skills: ['Rust', 'PostgreSQL', 'gRPC', 'Redis', 'Kafka', 'Docker'],
//     salary: 125,
//     imgUrl : '/person.jpg'

//   },
//   {
//     firstName: 'علي',
//     lastName: 'محمود',
//     bio: 'مدرب ومطور Full Stack باستخدام تقنيات MERN ويهتم باختبار الكود.',
//     position: 'مطور MERN متكامل',
//     skills: ['MongoDB', 'Express', 'React', 'Node.js', 'Jest', 'Cypress'],
//     salary: 100,
//     imgUrl : '/person.jpg'

//   },
//   {
//     firstName: 'ريم',
//     lastName: 'أمين',
//     bio: 'متخصصة في أمان التطبيقات وتساعد المطورين على كتابة كود آمن.',
//     position: 'خبيرة أمن تطبيقات',
//     skills: ['OWASP', 'نمذجة التهديدات', 'Java', 'Spring', 'Burp Suite', 'Linux'],
//     salary: 115,
//     imgUrl : '/person.jpg'

//   },
// ]);
//   return (
//     <>
//     {mentors.map((mentor)=>(
//       <Mentor {...mentor}/>
//     ))}
//     </>
//   );
// }
import React from "react";
import Mentor from "./Mentor";
import type { Teacher } from "../../Auth/RegisterMentor/types";
// interface MentorType {
//   firstName: string;
//   lastName: string;
//   bio: string;
//   position: string;
//   skills: string[];
//   salary: number;
//   imgUrl?: string; // علامة ? معناها إنه اختياري
// }

interface MentorsListProps {
  mentors: Teacher[] | undefined;
}

export default function MentorsList({ mentors }: MentorsListProps) {
  return (
    <>
       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> 
     {mentors?.map((t) => (
        <Mentor key={t.id} {...t} compact /> 
      ))}
    </div>
    </>
  );
}
