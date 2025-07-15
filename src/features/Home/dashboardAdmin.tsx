import  { useState } from "react";
import Sidebar from "./sidebarAdmin";
import Overview from "./overview";

import MentorsCards from "./mentorsforAdmin";

import StudentsTable from "./studentsforAdmin";
import MentorsRequests from "./mentorsRequests";

const DashboardAdmin = () => {
  const [view, setView] = useState<'overview' | 'students' | 'mentors'|'mentorsrequests'>('overview');

  return (
    <div className="flex">
      <Sidebar setView={setView} />
      <div className="flex-1 p-10">
      
        {view === 'overview' && <Overview/> }
        {view === 'students' && <StudentsTable/> }
        {view === 'mentors' && <MentorsCards />}
        {view === 'mentorsrequests' &&<MentorsRequests/>}
       
      </div>
    </div>
  );
};

export default DashboardAdmin;
