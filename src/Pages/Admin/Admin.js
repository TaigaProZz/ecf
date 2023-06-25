import './Admin.scss';
import { useEffect, useState } from 'react';
import AdminService from './AdminSection/AdminService/AdminService';
import AdminSchedule from './AdminSection/AdminSchedule/AdminSchedule';
import AdminEmployee from './AdminSection/AdminEmployee/AdminEmployee.js';
import AdminSecondHand from './AdminSection/AdminSecondHand/AdminSecondHand';
import AdminFeedback from './AdminSection/AdminFeedback/AdminFeedback';
import axios from 'axios';

function Admin() {
  const [container, setContainer] = useState(<AdminService />)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "scroll");
});

  return (
    <div className="admin-container">
      <div className="admin-bar">
        <button className='admin-bar-button' onClick={() => setContainer(<AdminService />)}>Services</button>
        <button className='admin-bar-button' onClick={() => setContainer(<AdminSchedule />)}>Horaires</button>
        <button className='admin-bar-button' onClick={() => setContainer(<AdminEmployee />)}>Employés</button>
        <button className='admin-bar-button' onClick={() => setContainer(<AdminSecondHand />)}>Vente véhicules</button>
        <button className='admin-bar-button' onClick={() => setContainer(<AdminFeedback />)}>Commentaires</button>
        <span className='permission-box'>Vous êtes : Admin</span>
      </div>
      <div className='admin-section-container'>
        {container}
      </div>
    </div>
  )
}

export default Admin;