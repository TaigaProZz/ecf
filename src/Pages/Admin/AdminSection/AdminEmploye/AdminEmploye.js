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

  // console.log(employe);
  return (
    <div className='employe-container'>
      <div className='employe'>
        <div className='employe-categorie-row'>
          <span className='employe-categorie-item'>Nom prénom</span>
          <span className='employe-categorie-item'>Email</span>
          <span className='employe-categorie-item'>Mot de passe</span>
          <span className='employe-categorie-item'>Permissions</span>
        </div> 
        { employe.map((elt, index) => {
          return (
            <div key={index} className='employe-list-row'>
              <span className='employe-list-element'>{elt.name}</span>
              <span className='employe-list-element'>{elt.email}</span>
              <button className='employe-list-element' onClick={resetPassword}>Réinitialiser le mot de passe</button>
              <span className='employe-list-element'>{elt.permission}</span>
            </div> 
          )
          
          })}
      </div>


    </div>)
  }

export default AdminEmployes;