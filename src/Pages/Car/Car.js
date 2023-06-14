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
            <div className='sub-image-first-line'>
              <img className='cars-image' src={element.image} alt='voiture'></img>
              <img className='cars-image' src={element.image} alt='voiture'></img>
              <img className='cars-image' src={element.image} alt='voiture'></img>
            </div>
            <div className='sub-image-second-line'>
              <img className='cars-image' src={element.image} alt='voiture'></img>
              <img className='cars-image' src={element.image} alt='voiture'></img>
              <img className='cars-image' src={element.image} alt='voiture'></img>
            </div>
          </div>
        </section>
      </div>
      <div className='right-side'>
        <h1>{element.brand}</h1>
        <h2>{element.title}</h2>
        <div className='car-price'>
          <p>{element.price} €</p></div>
        <div className='car-fiche'>
          <h1>Fiche Technique</h1>
          <p>{element.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Car;