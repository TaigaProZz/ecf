import './Car.scss';
import { CARS } from '../../data.js'
import { useParams } from 'react-router-dom';

function Car() {
  const params = useParams();
  const element = CARS.find(elt => elt.id === params.id);
  
  console.log(element.id);
  
  return (
    <div className="car-page-container">
      <div className='left-side center'>
        <section className='images-section center'>
          <img className='main-image' src={element.image} alt='voiture'></img>
          <div className='sub-image'>
            <img className='cars-image' src={element.image} alt='voiture'></img>
            <img className='cars-image' src={element.image} alt='voiture'></img>
            <img className='cars-image' src={element.image} alt='voiture'></img>
            <img className='cars-image' src={element.image} alt='voiture'></img>
            <img className='cars-image' src={element.image} alt='voiture'></img>
            <img className='cars-image' src={element.image} alt='voiture'></img>
          </div>
        </section>
      </div>
      <div className='right-side'>
        <h1>{element.brand}</h1>
        <h2>{element.title}</h2>
        <div>{element.price}</div>
        <div className='fiche'>
          <h1>Fiche Technique</h1>
          <p>{element.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Car;