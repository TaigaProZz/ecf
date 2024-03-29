import 'react-toastify/dist/ReactToastify.css';
import PopUpAddService from '../AdminComponents/PopUp/ServiceAdd';
import PopUpUpdateService from '../AdminComponents/PopUp/ServiceUpdate';
import ValidatePopUp from '../AdminComponents/PopUp/ValidatePopUp';
import { BsPlusSquare } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa';
import { IoTrashBinOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
    <>
      <header className='admin-header'>
        <PopUpAddService 
          btn={<button className='admin-button-add'>Ajouter un service <BsPlusSquare size={24} /></button> }
          type='Ajouter un service'
          onAddService={addService}
        />
      </header>
      <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Gérer</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {services.map((elt) => {
            return (
              <tr key={elt.id}>
                <td>{elt.services}</td>
                <td>
                  <PopUpUpdateService 
                    btn={<div className='pen-icon'><FaRegEdit size={24} /></div>}
                    type='Modifier un service'
                    id={elt.id}
                    onChangeService={updateService}
                  />
                </td>
                <td>
                  <ValidatePopUp
                    btn={<div><IoTrashBinOutline size={24} /></div>} 
                    onConfirmation={(choice) => {deleteService(choice, elt.id)}} 
                    txt={"supprimer"}
                    handleButtonClick={showConfirmation}
                  />
              </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
   
  )
} 

export default AdminServices;