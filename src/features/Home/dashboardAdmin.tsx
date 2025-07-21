import { useState } from "react";
import Sidebar from "./sidebarAdmin";
import Overview from "./overview";

import MentorsCards from "./mentorsforAdmin";

import StudentsTable from "./studentsforAdmin";
import MentorsRequests from "./mentorsRequests";
import AddSkillForm from "./addskill";
import AcceptedMentors from "./AcceptedMentors";
import RejectedMentors from "./RejectedMentors";
import { Messages } from "./Messages";

const DashboardAdmin = () => {
  const [view, setView] = useState<'overview' | 'students' | 'mentors' | 'mentorsrequests' | 'addskill' | 'AcceptedMentors' | 'RejectedMentors' | 'Messages'>('overview');

  return (
    <div className="flex">
      <Sidebar setView={setView} />
      <div className="flex-1 p-10">

        {view === 'overview' && <Overview />}
        {view === 'students' && <StudentsTable />}
        {view === 'mentors' && <MentorsCards />}
        {view === 'mentorsrequests' && <MentorsRequests />}
        {view === 'addskill' && <AddSkillForm></AddSkillForm>}
        {view === 'AcceptedMentors' && <AcceptedMentors></AcceptedMentors>}
        {view === 'RejectedMentors' && <RejectedMentors></RejectedMentors>}
        {view === 'Messages' && <Messages />}
      </div>
    </div>
  );
};

export default DashboardAdmin;
