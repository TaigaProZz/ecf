import { useEffect, useState } from 'react';
import './AdminSecondHand.scss';
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

  return (
    <div className='secondhand-container'>
      <div className='secondhand'>
        <div className='secondhand-categorie-row'>
          <span className='secondhand-categorie-element'>ID</span>
          <span className='secondhand-categorie-element'>Titre</span>
          <span className='secondhand-categorie-element'>Prix</span>
        </div> 
        { cars.map((elt, index) => {
          return (
            <div key={index} className='secondhand-list-row'>
              <span className='secondhand-list-element'>{elt.id}</span>
              <span className='secondhand-list-element'>{elt.title}</span>
              <span className='secondhand-list-element'>{elt.price} €</span>
            </div> 
          )
          })}
      </div>
    </div>
  )
}
export default AdminSecondHand;