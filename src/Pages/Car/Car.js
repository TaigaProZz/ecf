import './Car.scss';
import { useParams } from 'react-router-dom';

function Car() {
  const params = useParams();
  
  return (
    <div className="car-page-container">
      <p>{params.id}</p>
    </div>
  )
}

export default Car;