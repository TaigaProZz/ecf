import { useEffect, useState } from 'react';
import './AdminSecondHand.scss';
import PopUpAddCar from './PopUp/AdminAddCar';
import axios from 'axios';
import { BsPlusSquare } from 'react-icons/bs';
import ValidatePopUp from '../AdminComponents/PopUp/ValidatePopUp';

function AdminSecondHand () {
  const [cars, setCars] = useState(null);

  // collect all cars already in database
  const fetchData = async () => {
    const response = await axios.get(`https://ecf-node-serv.vercel.app:3307/car`);
    const result = response.data;
    setCars(result);
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
      alert('Veuillez remplir tous les champs');
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
      console.log(image);
      formData.append('image', image);
    });

    try {
      const response = await axios.post(`https://ecf-node-serv.vercel.app:3307/car`, formData);
      console.log(response);
      if (response.status === 200) {
        setCars([...cars, car]);
      } else {
        alert("Erreur lors de l'envoi des données");
      }
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'envoi des données :", error);
    }
  };

  const deleteCar = async (choice, carId) => {
    if(choice === 'valider') {
      try {
        await axios.delete(`https://ecf-node-serv.vercel.app:3307/car/${carId}`);
        fetchData();
        alert('Voiture supprimée');
      } catch (error) {
        alert("Erreur lors de l'envoi des données", error);
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