import { useEffect, useState } from 'react';
import './AdminSecondHand.scss';
import PopUpAddCar from './PopUp/AdminAddCar';
import axios from 'axios';

function AdminSecondHand () {
  const [cars, setCars] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3307/api/cars');
      const result = response.data;
      setCars(result);
    }
    fetchData();
  }, []);
  if(cars === null) {
    return;
  }

  const addCar = async (car) => {
    // check if input are not null
    if (car.title.trim() === '' || car.brand.trim() === '' || car.model.trim() === '' || car.description.trim() === '' || car.price.trim() === '' || car.km.trim() === '' || car.year.trim() === '' || car.images.trim() === '') {
      alert('Veuillez remplir tous les champs');
      return;
    }
    // check type of variable
    // if (typeof car.title !== 'string' || typeof car.brand !== 'string' || typeof car.model !== 'string' || typeof car.description !== 'string' || typeof car.price !== 'number' || typeof car.km !== 'number' || typeof car.year !== 'number' || typeof car.images !== 'string') {
    //   alert('Vérifiez les informations');
    // }
    try {
      const response = await axios.post('http://localhost:3307/api/postcar', {
          title: car.title,
          brand: car.brand,
          model: car.model,
          description: car.description,
          price: car.price,
          km: car.km,
          year: car.year,
          images: car.images,
      });
  
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

  return (
    <div className='admin-secondhand-container'>
      <div className='admin-secondhand'>
        <div className='admin-secondhand-categorie-row'>
          <span className='admin-secondhand-categorie-element'>ID</span>
          <span className='admin-secondhand-categorie-element'>Titre</span>
          <span className='admin-secondhand-categorie-element'>Prix</span>
        </div> 
        { cars.map((elt, index) => {
          return (
            <div key={index} className='admin-secondhand-list-row'>
              <span className='admin-secondhand-list-element'>{elt.id}</span>
              <span className='admin-secondhand-list-element'>{elt.title}</span>
              <span className='admin-secondhand-list-element'>{elt.price} €</span>
            </div> 
          )
          })}
      </div>
      <PopUpAddCar
      btn={<button className='admin-secondhand-add-btn'>Ajouter une voiture</button>}
      onAddCar={addCar}
      >
      </PopUpAddCar>
    </div>
  )
}
export default AdminSecondHand;