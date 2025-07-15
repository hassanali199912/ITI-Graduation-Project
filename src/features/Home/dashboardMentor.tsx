import React, { useState } from 'react';
import SidebarMentor from './sidebarforMentor';
import Overviewmentor from './overviewformentor';
import Students from './studentsforMentors';

const DashboardMentor = () => {
    const [view, setView] = useState<'overview' | 'students' | 'mentors'>('overview');
    return (
       
        <div className="flex">
      <SidebarMentor setView={setView}></SidebarMentor>
      <div className="flex-1 p-10">
      
      {view === 'students' && <Students/> }
      {view === 'overview' && <Overviewmentor/> }
      </div>
    </div>
    );
}

export default DashboardMentor;
