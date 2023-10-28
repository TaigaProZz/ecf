import 'react-toastify/dist/ReactToastify.css';
import PopUpAddCar from '../AdminComponents/PopUp/CarAdd';
import ValidatePopUp from '../AdminComponents/PopUp/ValidatePopUp';
import ManageCarPopUp from '../AdminComponents/PopUp/CarManage';
import { BsPlusSquare } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { IoTrashBinOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminSecondHand () {
  const [cars, setCars] = useState(null);

  // collect all cars already in database
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/car`);
      const result = response.data;
      setCars(result);
    } catch (error) {
      toast.error("Erreur lors de la récuparation des données", error);
    }
  
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  if(cars === null) {
    return;
  }

  const addCar = async (car) => {
    // check if input are not null
    if (
      car.title.trim() === ''
      || car.brand.trim() === '' 
      || car.model.trim() === '' 
      || car.description.trim() === '' || car.price.trim() === '' 
      || car.km.trim() === '' 
      || car.year.trim() === '' 
      || car.images.length === 0
      ) {
      toast.warn('Veuillez remplir tous les champs');
      return;
    }
   
    const formData = new FormData();
    formData.append('title', car.title);
    formData.append('brand', car.brand);
    formData.append('model', car.model);
    formData.append('description', car.description);
    formData.append('price', car.price);
    formData.append('km', car.km);
    formData.append('year', car.year);
    car.images.forEach((image, index) => {
      formData.append('carImage', image);
    });

    try {
      await toast.promise (
        axios.post(`${process.env.REACT_APP_API}/car`, formData),
        {
          pending: 'Envoi des données...',
          success: {
            render({ data }) {
              setCars([...cars, car]);
              return `Voiture ajoutée avec succès !`;
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
      console.log(error);
      toast.error("Erreur lors de l'envoi des données :", error);
    }
  };

  const deleteCar = async (choice, carId) => {
    if(choice === 'valider') {
      try {
        await toast.promise (
          axios.delete(`${process.env.REACT_APP_API}/car/${carId}`),
          {
            pending: 'Suppression de la voiture...',
            success: {
              render({ data }) {
                fetchData();
                return `Voiture supprimée avec succès !`;
              }
            },
            error: {
              render({ data }) {
                return `Erreur lors de la suppression de la voiture : ${data}`;
              }
            }
          }
        )
      } catch (error) {
        toast.error("Erreur lors de l'envoi des données", error);
      }
    }
  };

  const handleCarUpdate = async (car) => {
    try {
      await toast.promise (
        axios.put(`${process.env.REACT_APP_API}/car/${car.get('id')}`, car),
        {
          pending: 'Envoi des données...',
          success: {
            render({ data }) {
              fetchData();
              return `Voiture modifiée avec succès !`;
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
      toast.error("Erreur lors de l'envoi des données", error);
    }
  };

  return (
    <>
      <header className='admin-header'>
        <PopUpAddCar
          btn={<button className='admin-button-add'>Ajouter une voiture <BsPlusSquare size={24} /></button>}
          onAddCar={addCar}
        />
      </header>
      <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Prix</th>
            <th>Gérer</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((elt) => {
            return (
              <tr key={elt.id}>
                <td>{elt.id}</td>
                <td>{elt.title}</td>
                <td>{elt.price}</td>
                <td>
                  <ManageCarPopUp
                    btn={<div><FaRegEdit size={24} /></div>}
                    type='Modifier une voiture'
                    onUpdateCar={(car) => handleCarUpdate(car)}
                    element={elt}
                  />
                  </td>
                <td>
                  <ValidatePopUp
                    btn={<div onClick={deleteCar}><IoTrashBinOutline size={24} /></div>}
                    onConfirmation={(choice) => deleteCar(choice, elt.id)}
                    txt='supprimer cette voiture'
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
export default AdminSecondHand;