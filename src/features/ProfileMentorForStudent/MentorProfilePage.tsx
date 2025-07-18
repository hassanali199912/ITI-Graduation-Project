import React from 'react';
import ProfileSection from './ProfileSection';
import AboutSection from './AboutSection';
import MenteesReviews from './MenteesReviews';
import SkillsSection from './SkillsSection';


const MentorProfilePage = () => {
  return (
    <div className="bg-white">
      <ProfileSection />
      <AboutSection />
      <SkillsSection />
      <MenteesReviews />
    </div>
  );
};

export default MentorProfilePage;
