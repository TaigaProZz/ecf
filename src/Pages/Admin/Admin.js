import './Admin.scss';
import { useState } from 'react';
import AdminService from './AdminSection/AdminService/AdminService';
import AdminSchedule from './AdminSection/AdminSchedule/AdminSchedule';
import AdminEmployee from './AdminSection/AdminEmployee/AdminEmployee.js';
import AdminSecondHand from './AdminSection/AdminSecondHand/AdminSecondHand';
import AdminFeedback from './AdminSection/AdminFeedback/AdminFeedback';

function Admin(props) {
  const [container, setContainer] = useState(<AdminService />)

  return (
    <div className="admin-container">
      <div className="admin-bar">
        {props.isAdmin 
          ?  
          <>
            <button className='admin-bar-button' onClick={() => setContainer(<AdminService />)}>Services</button>
            <button className='admin-bar-button' onClick={() => setContainer(<AdminSchedule />)}>Horaires</button>
            <button className='admin-bar-button' onClick={() => setContainer(<AdminEmployee />)}>Employés</button>
            <button className='admin-bar-button' onClick={() => setContainer(<AdminSecondHand />)}>Vente véhicules</button>
            <button className='admin-bar-button' onClick={() => setContainer(<AdminFeedback />)}>Commentaires</button> 
          </>
          :  
          <> 
            <button className='admin-bar-button' onClick={() => setContainer(<AdminSecondHand />)}>Vente véhicules</button>
            <button className='admin-bar-button' onClick={() => setContainer(<AdminFeedback />)}>Commentaires</button>
          </>
        }
       
        <span className='permission-box'>Vous êtes : {props.isAdmin ? "Admin" : "Employé"}  </span>
      </div>
      <div className='admin-section-container'>
        {container}
      </div>
    </div>
  )
}


export default Admin;