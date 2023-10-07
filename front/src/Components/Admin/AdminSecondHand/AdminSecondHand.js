import './AdminSecondHand.scss';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { BsPlusSquare } from 'react-icons/bs';
import PopUpAddCar from './PopUp/AdminAddCar';
import ValidatePopUp from '../AdminComponents/PopUp/ValidatePopUp';
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

  return (
    <div className='admin-secondhand-container'>
      <div className='admin-secondhand'>
        <div className='admin-secondhand-categorie-row'>
          <span className='admin-secondhand-categorie-element'>ID</span>
          <span className='admin-secondhand-categorie-element'>Titre</span>
          <span className='admin-secondhand-categorie-element'>Prix</span>
          <span className='admin-secondhand-categorie-element'>Gérer</span>
        </div> 
        { cars.map((elt, index) => {
          return (
            <div key={index} className='admin-secondhand-list-row'>
              <span className='admin-secondhand-list-element'>{elt.id}</span>
              <span className='admin-secondhand-list-element'>{elt.title}</span>
              <span className='admin-secondhand-list-element'>{elt.price} €</span>
              <div className='admin-secondhand-manage-container'>
                {/* <button className='admin-secondhand-manage-button'>Modifier</button> */}
                <ValidatePopUp
                  btn={<button className='admin-secondhand-manage-button' onClick={deleteCar}>Supprimer</button>}
                  onConfirmation={(choice) => deleteCar(choice, elt.id)}
                  txt='supprimer cette voiture'
                  >
                </ValidatePopUp>

              </div>
            </div> 
          )
          })}
      </div>
      <PopUpAddCar
        btn={<button className='admin-add-btn'>Ajouter une voiture <BsPlusSquare size={30} /></button>}
        onAddCar={addCar}
        >
      </PopUpAddCar>
    </div>
  )
}
export default AdminSecondHand;