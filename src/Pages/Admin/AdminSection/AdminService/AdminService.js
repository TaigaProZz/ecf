import './AdminService.scss'
import { BsPlusSquare } from 'react-icons/bs'
import { FaTrash, FaPen} from 'react-icons/fa'
import { useState, useEffect } from 'react';
import AdminPopUp from './AdminPopUp/AdminPopUp';
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
    await axios.post('http://localhost:3307/api/postservices', { services: service });
  };


  // DELETE SERVICE function
  const deleteRow = async (id) => { 
    const response = await axios.delete('http://localhost:3307/api/deleteservices/' + id);
    const service = response.data;
    console.log(service);
  }

  // UPDATE SERVICE function
  const updateRow = async (id) => {
    const response = await axios.put('http://localhost:3307/api/updateservices/' + id);
    const service = response.data;
    console.log(service);
  }

  
 

  return ( 
    <div className='admin-service-container'>
    <header>
      <AdminPopUp 
        btn={<button className='add-service-btn'>Ajouter un service <BsPlusSquare size={30} /></button>}
        onAddService={addService}
      />
    </header>
    <div className='admin-service-container'>
      {services.map((service, index) => (
        <div key={index} className='admin-service-row'>
          <div>
            <h2>{service.services}</h2>
          </div>
          <div>
            <FaPen size={30} />
            <FaTrash size={30} onClick={() => deleteRow(service.id)}/>
          </div>
        </div>
      ))}
    </div>
  </div>

    )
} 

export default AdminServices;