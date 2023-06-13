import './Car.scss';
import { CARS } from '../../data.js'
import { useParams } from 'react-router-dom';

function Car() {
  const params = useParams();
  const element = CARS.find(elt => elt.id = params.id);
  
  
  return (
    <div className="car-page-container">
      <p>{element.brand}</p>
    </div>
  )
}

export default Car;