import React from 'react';
import { Chip } from '@mui/material';

const skills = [
    'C#', '.NET', 'SQL', 'AWS', 'Typescript', 'JavaScript', 'Angular', 'Coding',
    'Agile', 'Career Growth', 'Career Coaching', 'Career', 'Interview', 'Java Script',
    'Coaching', 'Product Strategy', 'Technical Leadership', 'Design Leadership',
    'Agile Development', 'Clean Code', 'Clean Architecture', 'Technical Design',
    'Technical Interviews', 'Cloud', 'Software Architecture', 'Software Engineering',
    'Cloud Computing', 'Blazor', 'HTML', 'Git', 'Backend', 'Full Stack', 'ASP.NET Core',
    'DotNet Core', 'Design System'
];

const SkillsSection = () => {
    return (
        <div dir="rtl" className="max-w-5xl mx-auto px-4 mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-4">المهارات</h2>

            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <Chip
                        key={index}
                        label={skill}
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

export default SkillsSection;
