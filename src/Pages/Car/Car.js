import './Car.scss';
import { CARS } from '../../data/cars.js'
import { useParams } from 'react-router-dom';

function Car() {
  const params = useParams();
  const element = CARS.find(elt => elt.id === params.id);
  // console.log(element.image);
  // create an  image for every img available in the element 
  const images = element.image.map((img, index) => {
    return <img key={index} className='cars-image' src={img} alt='voiture'></img>
  })
  console.log(images);
  
  return (
    <div className="car-page-container">
      <div className='left-side center'>
        <section className='images-section center'>
          <img className='main-image' src={element.image[0]} alt='voiture'></img>
          <div className='sub-image-container'>
            <div className='sub-image'> 
              {images}
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