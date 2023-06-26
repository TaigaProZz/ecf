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
    </div>
  )
}
export default AdminSecondHand;