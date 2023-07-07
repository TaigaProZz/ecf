import './Admin.scss';
import { useEffect, useState } from 'react';
import AdminService from './AdminSection/AdminService/AdminService';
import AdminSchedule from './AdminSection/AdminSchedule/AdminSchedule';
import AdminEmployee from './AdminSection/AdminEmployee/AdminEmployee.js';
import AdminSecondHand from './AdminSection/AdminSecondHand/AdminSecondHand';
import AdminFeedback from './AdminSection/AdminFeedback/AdminFeedback';

const ADMIN_SECTIONS = {
  'Services' : {
    component: <AdminService />,
    isAdmin: true
  },
  'Horaires' : {
    component: <AdminSchedule />,
    isAdmin: true
  },
  'Employés' : {
    component: <AdminEmployee />,
    isAdmin: true
  },
  'Vente véhicules' : {
    component: <AdminSecondHand />,
    isAdmin: false
  },
  'Commentaires' : {
    component: <AdminFeedback />,
    isAdmin: false
  }
}

function Admin({ user }) {
  const [container, setContainer] = useState(<AdminFeedback />);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    if (!user.permission) return;
    setAdmin(user.permission === 1);
  }, [user.permission])


  return (
    <div className="admin-container">
      <div className="admin-bar">
        {
          // hide some admin sections if user is not admin
          Object.keys(ADMIN_SECTIONS).map((section, index) => 
            (isAdmin || !ADMIN_SECTIONS[section].isAdmin) && <button key={index} className='admin-bar-button' onClick={() => setContainer(ADMIN_SECTIONS[section].component)}>{section}</button>
          )
        }
      </div>
      
      <div className='admin-section-container'>
        {/* <span className='permission-box'>Vous êtes : {isAdmin ? "Admin" : "Employé"}  </span> */}
        {container}
      </div>
    </div>
  )
}


export default Admin;