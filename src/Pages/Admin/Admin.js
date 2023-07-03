import './Admin.scss';
import { useEffect, useState } from 'react';
import AdminService from './AdminSection/AdminService/AdminService';
import AdminSchedule from './AdminSection/AdminSchedule/AdminSchedule';
import AdminEmployee from './AdminSection/AdminEmployee/AdminEmployee.js';
import AdminSecondHand from './AdminSection/AdminSecondHand/AdminSecondHand';
import AdminFeedback from './AdminSection/AdminFeedback/AdminFeedback';
import axios from 'axios';

function Admin() {
  const [container, setContainer] = useState(<AdminSecondHand />)
  const [isAdmin, setAdmin] = useState(false);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    try {
      // get cookie token
      const cookieResponse = await axios.get("http://localhost:3307/api/getcookie");
      const token = cookieResponse.data.session;

      // check if token is valid
      if (!token) {
        return alert('Veuillez réssayer');
      }
      // get permission
      const response = await axios.get("http://localhost:3307/api/getpermission", { 
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      const permission = response.data.permission;
      if (permission === 1) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="admin-container">
      <div className="admin-bar">
        {isAdmin 
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
        <span className='permission-box'>Vous êtes : {isAdmin ? "Admin" : "Employé"}  </span>
      </div>
      <div className='admin-section-container'>
        {container}
      </div>
    </div>
  )
}


export default Admin;