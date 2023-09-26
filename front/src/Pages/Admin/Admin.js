import './Admin.scss';
import { useEffect, useState } from 'react';
import AdminService from '../../Components/Admin/AdminService/AdminService';
import AdminSchedule from '../../Components/Admin/AdminSchedule/AdminSchedule';
import AdminEmployee from '../../Components/Admin/AdminEmployee/AdminEmployee.js';
import AdminSecondHand from '../../Components/Admin/AdminSecondHand/AdminSecondHand';
import AdminFeedback from '../../Components/Admin/AdminFeedback/AdminFeedback';

const ADMIN_SECTIONS = {
  'Services': {
    component: <AdminService />,
    isAdmin: true
  },
  'Horaires': {
    component: <AdminSchedule />,
    isAdmin: true
  },
  'Employés': {
    component: <AdminEmployee />,
    isAdmin: true
  },
  'Vente véhicules': {
    component: <AdminSecondHand />,
    isAdmin: false
  },
  'Commentaires': {
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
      {!(user.permission === 0 || user.permission === 1) ? <div>Vous devez être connecté pour accéder à cette page.</div> : (
        <>
          <div className="admin-bar">
            {
              // hide some admin sections if the user is not an admin
              Object.keys(ADMIN_SECTIONS).map((section, index) =>
                (isAdmin || !ADMIN_SECTIONS[section].isAdmin) &&
                <button key={index} className='admin-bar-button' onClick={() => setContainer(ADMIN_SECTIONS[section].component)}>
                  {section}
                </button>
              )
            }
          </div>
          <div className='admin-section-container'>
            {container}
          </div>
        </>
      )}
    </div>
  )
}

export default Admin;