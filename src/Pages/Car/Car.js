import './Car.scss';
import { CARS } from '../../Data/cars.js'
import { useParams } from 'react-router-dom';
import { BsEnvelopeFill } from 'react-icons/bs';

function Car() {
  const params = useParams();
  const element = CARS.find(elt => elt.id === params.id);
 
  const images = element.image.map((img, index) => {
      return <img key={index} className='cars-image' src={img} alt='voiture'></img>
    });
  
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
        <h2 className='title'>{element.title}</h2>
        <div className='car-price'>
          <p>{element.price} €</p></div>
        <div className='car-fiche'>
          <h2>Fiche Technique</h2>
          <p>Référence : {element.id}</p>
          <p>{element.description}</p>
        </div>
        <div className='contact-container'>
          <h2>Interéssé ? Contactez-nous</h2>
          <a href={'/carcontact/' + element.id}>
            <button className='shc-button'><BsEnvelopeFill size={35}/></button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Car;