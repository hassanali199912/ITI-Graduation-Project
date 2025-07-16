import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetMentorByIdQuery,    // لو حابب lazy ممكن تسيبها بس هنا أسهل
  useLazyGetMentorByIdQuery,
} from "../Auth/api/mentorsApi";

import ProfileSection from "./ProfileSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
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
  if (!mentor) return null;    

  return (
    <div className="bg-white">
      <ProfileSection {...mentor} />
      <AboutSection bio={mentor.bio} />
      <SkillsSection skills={mentor.skills} />
      <MenteesReviews  />
    </div>
  );
};

export default MentorProfilePage;
