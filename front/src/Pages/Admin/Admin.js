import './Admin.scss';
import { useEffect, useState } from 'react';
import AdminService from '../../Components/Admin/AdminService/AdminService';
import AdminSchedule from '../../Components/Admin/AdminSchedule/AdminSchedule';
import AdminEmployee from '../../Components/Admin/AdminEmployee/AdminEmployee';
import AdminSecondHand from '../../Components/Admin/AdminSecondHand/AdminSecondHand';
import AdminFeedback from '../../Components/Admin/AdminFeedback/AdminFeedback';

const ADMIN_SECTIONS = {
  'Services': {
    name: 'Services',
    component: <AdminService />,
    isAdmin: true
  },
  'Horaires': {
    name: 'Horaires',
    component: <AdminSchedule />,
    isAdmin: true
  },
  'Employés': {
    name: 'Employés',
    component: <AdminEmployee />,
    isAdmin: true
  },
  'Vente véhicules': {
    name: 'Vente véhicules',
    component: <AdminSecondHand />,
    isAdmin: false
  },
  'Commentaires': {
    name: 'Commentaires',
    component: <AdminFeedback />,
    isAdmin: false
  }
}

function Admin({ user }) {
  const [container, setContainer] = useState(<AdminFeedback />);
  const [isAdmin, setAdmin] = useState(false);
  const [activeItem, setActiveItem] = useState('Commentaires');

  useEffect(() => {
    if (!user.permission) return;
    setAdmin(user.permission === 1);
  }, [user.permission])

  const handleClick = (menuItem) => {
    setContainer(menuItem.component)
    setActiveItem(menuItem.name); 
  }

  return (
    <div className='admin-container'>
      {!(user.permission === 0 || user.permission === 1) ? <div>Vous devez être connecté pour accéder à cette page.</div> : (
        <>
          <div className='admin-header'>
            <img src='img/logo.png' alt='figsale logo'></img>
          </div>
          <div className='admin-main-container'>
            <div className='admin-menu'>
            {Object.keys(ADMIN_SECTIONS).map((section, index) => {
              const menuItem = ADMIN_SECTIONS[section];
              if (isAdmin|| !menuItem.isAdmin) {
                return (
                  <span
                    key={index}
                    className={menuItem.name === activeItem ? 'admin-menu-item active' : 'admin-menu-item'}
                    onClick={() => handleClick(menuItem)}
                  >
                    {menuItem.name}
                  </span>
                );
              }
              return null;
            })}
            </div>
            <div className='admin-content-container'>
              {container}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Admin;