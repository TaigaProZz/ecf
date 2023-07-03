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
  const [container, setContainer] = useState(<AdminSecondHand />)
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    if (!user.permission) return;
    setAdmin(user.permission === 1);
  }, [user.permission])

  return (
    <div className="admin-container">
      <div className="admin-bar">
        {
          Object.keys(ADMIN_SECTIONS).map((section, index) => 
            (isAdmin || !ADMIN_SECTIONS[section].isAdmin) && <button key={index} className='admin-bar-button' onClick={() => setContainer(ADMIN_SECTIONS[section].component)}>{section}</button>
          )
        }
        <span className='permission-box'>Vous êtes : {isAdmin ? "Admin" : "Employé"}  </span>
      </div>
      <div className='admin-section-container'>
        {container}
      </div>
    </div>
  )
}


export default Admin;