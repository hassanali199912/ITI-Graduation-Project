import React from 'react';
import { Chip } from '@mui/material';
import type { Skill } from '../Auth/RegisterMentor/types';
import Skeleton from '@mui/material/Skeleton';

// const skills = [
//     'C#', '.NET', 'SQL', 'AWS', 'Typescript', 'JavaScript', 'Angular', 'Coding',
//     'Agile', 'Career Growth', 'Career Coaching', 'Career', 'Interview', 'Java Script',
//     'Coaching', 'Product Strategy', 'Technical Leadership', 'Design Leadership',
//     'Agile Development', 'Clean Code', 'Clean Architecture', 'Technical Design',
//     'Technical Interviews', 'Cloud', 'Software Architecture', 'Software Engineering',
//     'Cloud Computing', 'Blazor', 'HTML', 'Git', 'Backend', 'Full Stack', 'ASP.NET Core',
//     'DotNet Core', 'Design System'
// ];
interface SkillsSectionProps {
  skills: Skill[];
}
const SkillsSection = ({skills}:SkillsSectionProps) => {
    
    return (
        <div dir="rtl" className="max-w-5xl mx-auto px-4 mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-4">المهارات</h2>

            <div className="flex flex-wrap gap-2">
                {skills?.map((skill, index) => (
                    <Chip
                        key={index}
                        label={skill.skillName}
                        size="small"
                        sx={{
                            backgroundColor: '#F4F9FB',
                            fontSize: '0.9rem',
                            paddingX: '12px',
                            paddingY: '6px',
                            borderRadius: '16px',
                            height: 'auto',
                            fontWeight: 400,
                        }}
                    />
                ))}
            </div>

            <div className="w-full h-[1.5px] bg-gray-200 my-12" />
        </div>
    );
};

export const SkillsSectionSkeleton = () => (
  <div className="p-4">
    <Skeleton variant="text" width={100} height={32} style={{ marginBottom: 8 }} />
    <div className="flex gap-2 flex-wrap">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} variant="rectangular" width={80} height={32} style={{ borderRadius: 16 }} />
      ))}
    </div>
  </div>
);

export default SkillsSection;
