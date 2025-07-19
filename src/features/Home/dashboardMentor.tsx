import React, { useState } from 'react';
import SidebarMentor from './sidebarforMentor';
import Overviewmentor from './overviewformentor';
import Students from './studentsforMentors';

const DashboardMentor = () => {
    const [view, setView] = useState<'overview' | 'students' | 'mentors'>('overview');
    return (
       
        <div className="flex flex-row-reverse min-h-screen" dir="rtl">
  <SidebarMentor setView={setView} />
  <div className="flex-1 p-6 bg-gray-50">
    {view === 'students' && <Students />}
    {view === 'overview' && <Overviewmentor />}
  </div>
</div>
    );
}

export default DashboardMentor;
