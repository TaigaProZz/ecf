import './AdminService.scss'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { BsPlusSquare } from 'react-icons/bs'
import { FaTrash, FaPen } from 'react-icons/fa'
import { useState, useEffect } from 'react';
import PopUpAddService from '../AdminComponents/PopUp/ServiceAdd';
import PopUpUpdateService from '../AdminComponents/PopUp/ServiceUpdate';
import axios from 'axios';
import ValidatePopUp from '../AdminComponents/PopUp/ValidatePopUp';

function AdminServices () {
  const [services, setServices] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // fetch all services function
  const fetchData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/service`);
    const service = response.data;
    setServices(service);
  }
  useEffect(() => {
    fetchData();
  }, [])


  // ADD SERVICE function
  const addService = async (service) => {
    if(service === '') {
      toast.warn("Veuillez remplir le champ");
      return;
    }
    try {
      await toast.promise (
        axios.post(`${process.env.REACT_APP_API}/service`, { services: service }),
        {
          pending: 'Envoi des données...',
          success: {
            render({ data }) {
              fetchData();
              return 'Service ajouté';
            }
          },
          error: {
            render({ data }) {
              return `Erreur lors de l'envoi des données : ${data}`;
            }
          }
        }
      )
    } catch (error) {
      toast.error("Erreur lors de l'ajout", error)
    }
  };


  // DELETE SERVICE function
  const deleteService = async (choice, id) => { 
    if(choice === 'valider') {
      try {
        await toast.promise (
          axios.delete(`${process.env.REACT_APP_API}/service/` + id),
          {
            pending: 'Suppression du service...',
            success: {
              render({ data }) {
                fetchData();
                return 'Service supprimé';
              }
            },
            error: {
              render({ data }) {
                return `Erreur lors de la suppression : ${data}`;
              }
            }
          }
        )
      } catch (error) {
        toast.error('Erreur lors de la suppression', error);
      }
      setShowConfirmation(false);
    }
  }

  // UPDATE SERVICE function
  const updateService = async (service, id) => {
    if(service === '') {
      toast.warn('Veuillez remplir le champ');
      return;
    }
    try {
      await toast.promise (
        axios.put(`${process.env.REACT_APP_API}/service/` + id, {services: service}),
        { 
          pending: 'Modification du service...',
          success: {
            render({ data }) {
              fetchData();
              return 'Service modifié';
            }
          },
          error: {
            render({ data }) {
              return `Erreur lors de la modification : ${data}`;
            }
          }
        }
      )
    } catch (error) {
      toast.error('Erreur lors de la modification', error);
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
            <ValidatePopUp
              btn={<div> <FaTrash size={30} /> </div>} 
              onConfirmation={(choice) => {deleteService(choice, service.id)}} 
              txt={"valider"}
              handleButtonClick={showConfirmation}
            />
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