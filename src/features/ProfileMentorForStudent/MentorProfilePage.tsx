import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetMentorByIdQuery,    // لو حابب lazy ممكن تسيبها بس هنا أسهل
  useLazyGetMentorByIdQuery,
} from "../Auth/api/mentorsApi";

import ProfileSection, { ProfileSectionSkeleton } from "./ProfileSection";
import AboutSection, { AboutSectionSkeleton } from "./AboutSection";
import SkillsSection, { SkillsSectionSkeleton } from "./SkillsSection";
import MenteesReviews from "./MenteesReviews";
import type { Skill } from "../Auth/RegisterMentor/types";

const MentorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [triggerMentor, { data: mentorData, isFetching, error }] =
    useLazyGetMentorByIdQuery();

  useEffect(() => {
    if (id) {
      triggerMentor(id);
    }
  }, [id, triggerMentor]);

  const mentor = mentorData?.data;
  console.log(mentor)
  if (isFetching) {
    return (
      <div className="bg-white">
        <ProfileSectionSkeleton />
        <AboutSectionSkeleton />
        <SkillsSectionSkeleton />
      </div>
    );
  }

  if (!mentor) return null;

  return (
    <div className="bg-white">
      <ProfileSection {...mentor} />
      <AboutSection bio={mentor?.bio} id={mentor?.userId || ""} userId={mentor?.userId || ""} firstName={mentor.firstName} />
      <SkillsSection skills={mentor.skills} />
      <MenteesReviews teacherId={id!} studentId={localStorage.getItem('studentId') || ''} />
    </div>
  );
};

export default MentorProfilePage;
