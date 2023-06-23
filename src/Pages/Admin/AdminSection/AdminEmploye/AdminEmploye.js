import { useEffect, useState } from 'react';
import './AdminEmploye.scss';
import axios from 'axios';

function AdminEmployes () {
  const [employe, setEmploye] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3307/api/employe');
      const result = response.data;
      setEmploye(result);
    }
    fetchData();
  }, []);
  if(employe === null) {
    return;
  }

  const resetPassword = () => {
    console.log("password reset");
  }

  return (
    <div className='employe-container'>
      <div className='employe'>
        <div className='employe-categorie-row'>
          <span className='employe-categorie-element-id'>ID</span>
          <span className='employe-categorie-element'>Nom prénom</span>
          <span className='employe-categorie-element'>Email</span>
          <span className='employe-categorie-element-password'>Mot de passe</span>
          <span className='employe-categorie-element-permission'>Permissions</span>
        </div> 
        { employe.map((elt, index) => {
          return (
            <div key={index} className='employe-list-row'>
              <span className='employe-list-element-id'>{elt.id}</span>
              <span className='employe-list-element-name'>{elt.name}</span>
              <span className='employe-list-element-email'>{elt.email}</span>
              <button className='employe-list-element-password' onClick={resetPassword}>Réinitialiser le mot de passe</button>
              <span className='employe-list-element-permission'>{elt.permission}</span>
            </div> 
          )
          })}
      </div>
    </div>
  )
}

export default AdminEmployes;