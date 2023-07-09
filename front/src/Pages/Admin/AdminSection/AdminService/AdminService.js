import './AdminService.scss'
import { BsPlusSquare } from 'react-icons/bs'
import { FaTrash, FaPen } from 'react-icons/fa'
import { useState, useEffect } from 'react';
import PopUpAddService from './AdminPopUp/AdminAddService';
import PopUpUpdateService from './AdminPopUp/AdminUpdateService';
import axios from 'axios';
require('dotenv').config();

function AdminServices () {
  const [services, setServices] = useState([]);

  // fetch all services function
  const fetchData = async () => {
    const response = await axios.get(`ecf-node-serverr.vercel.app:${process.env.REACT_APP_API_PORT}/service`);
    const service = response.data;
    setServices(service);
  }
  useEffect(() => {
    fetchData();
  }, [])

  // ADD SERVICE function
  const addService = async (service) => {
    if(service === '') {
      alert('Veuillez remplir le champ');
      return;
    }
    try {
      await axios.post(`ecf-node-serverr.vercel.app:${process.env.REACT_APP_API_PORT}/service`, { services: service });
      fetchData();
    } catch (error) {
      alert("Erreur lors de l'ajout", error)
    }
  };


  // DELETE SERVICE function
  const deleteService = async (id) => { 
    try {
      await axios.delete(`ecf-node-serverr.vercel.app:${process.env.REACT_APP_API_PORT}/service/` + id);
      fetchData();
    } catch (error) {
      alert('Erreur lors de la suppression', error);
    }
  }

  // UPDATE SERVICE function
  const updateService = async (service, id) => {
    if(service === '') {
      alert('Veuillez remplir le champ');
      return;
    }
    try {
      await axios.put(`ecf-node-serverr.vercel.app:${process.env.REACT_APP_API_PORT}/service/` + id, {services: service});
      fetchData();
    } catch (error) {
      alert('Erreur lors de la modification', error);
    }
  }

  return ( 
    <div className='admin-service-container'>
      <div className='admin-service-list-container'>
        { services.map((service, index) => (
          <div key={index} className='admin-service-row'>
            <div>
              <h2>{service.services}</h2>
            </div>
            <div className='icons'>
            <PopUpUpdateService 
              btn={<div className='pen-icon'> <FaPen size={30} /></div>}
              type='Modifier un service'
              id={service.id}
              onChangeService={updateService}>
            </PopUpUpdateService>
              <FaTrash size={30} onClick={() => deleteService(service.id)}/>
            </div>
          </div>
        ))}
      </div>
      <div className='admin-service-btn'>
        <PopUpAddService 
          btn={<button className='admin-add-btn'>Ajouter un service <BsPlusSquare size={30} /></button>}
          type='Ajouter un service'
          onAddService={addService}>
        </PopUpAddService>
      </div>
    </div>
  )
} 

export default AdminServices;