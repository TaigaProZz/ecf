import './Admin.scss';
import { useState } from 'react';
import AdminService from './AdminSection/AdminService/AdminService';
import AdminSchedule from './AdminSection/AdminSchedule/AdminSchedule';
import AdminEmploye from './AdminSection/AdminEmploye/AdminEmploye.js';
import AdminSecondHand from './AdminSection/AdminSecondHand/AdminSecondHand';
import AdminFeedback from './AdminSection/AdminFeedback/AdminFeedback';

function Admin() {
  const [container, setContainer] = useState(<AdminService />)

  return (
    <div className="admin-container">
      <div className="admin-bar">
        <button onClick={() => setContainer(<AdminService />)}>Services</button>
        <button onClick={() => setContainer(<AdminSchedule />)}>Horaires</button>
        <button onClick={() => setContainer(<AdminEmploye />)}>Employés</button>
        <button onClick={() => setContainer(<AdminSecondHand />)}>Vente véhicules</button>
        <button onClick={() => setContainer(<AdminFeedback />)}>Commentaires</button>
      </div>
      <div className='admin-section-container'>
        {container}
      </div>
    </div>
  )
}

export default Admin;