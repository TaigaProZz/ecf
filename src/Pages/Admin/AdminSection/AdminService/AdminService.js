import './AdminService.scss'
import { BsPlusSquare } from 'react-icons/bs'
import { FaTrash, FaPen} from 'react-icons/fa'
import { useState, useEffect } from 'react';
import PopUpAddService from './AdminPopUp/AdminAddService';
import PopUpUpdateService from './AdminPopUp/AdminUpdateService';
import axios from 'axios';

function AdminServices () {
  const [services, setServices] = useState([]);

  // fetch all services function
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3307/api/getservices');
      const service = response.data;
      setServices(service);
    }
    fetchData();
  }, [])

  // ADD SERVICE function
  const addService = async (service) => {
    if(service === '') {
      alert('Veuillez remplir le champ');
      return;
    }
    await axios.post('http://localhost:3307/api/postservices', { services: service });
    setServices([...services, {services: service}]);
  };


  // DELETE SERVICE function
  const deleteService = async (id) => { 
    const response = await axios.delete('http://localhost:3307/api/deleteservices/' + id);
    const service = response.data;
  }

  // UPDATE SERVICE function
  const updateService = async (service, id) => {
    if(service === '') {
      alert('Veuillez remplir le champ');
      return;
    }
    await axios.put('http://localhost:3307/api/updateservices/' + id, {services: service});
  }

  return ( 
    <div className='admin-service-container'>
      <header>
        <PopUpAddService 
          btn={<button className='add-service-btn'>Ajouter un service <BsPlusSquare size={30} /></button>}
          type='Ajouter un service'
          onAddService={addService}>
        </PopUpAddService>
      </header>

      <div className='admin-service-container'>
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
    </div>
  )
} 

export default AdminServices;