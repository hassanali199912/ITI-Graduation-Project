import  { useState } from "react";
import Sidebar from "./sidebarAdmin";
import Overview from "./overview";

import MentorsCards from "./mentorsforAdmin";
import Students from "./studentsforMentors";
import StudentsTable from "./studentsforAdmin";

const DashboardAdmin = () => {
  const [view, setView] = useState<'overview' | 'students' | 'mentors'>('overview');

  return (
    <div className="flex">
      <Sidebar setView={setView} />
      <div className="flex-1 p-10">
      
        {view === 'overview' && <Overview/> }
        {view === 'students' && <StudentsTable/> }
        {view === 'mentors' && <MentorsCards />}
      </div>
    </div>
  );
};

export default DashboardAdmin;
