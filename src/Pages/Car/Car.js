import './Car.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { BsEnvelopeFill } from 'react-icons/bs';

function Car() {
  const [element, setElement] = useState(null);
  const [images, setImages] = useState([]);

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3307/api/cars/${params.id}`);
        const car = response.data;
        setElement(car[0]);
        const imageList = JSON.parse(car[0].images);
        setImages(imageList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [params.id]);

  if (!element) {
    return null; // Ajout d'une gestion si le véhicule n'est pas encore chargé
  }

  return (
    <div className="car-page-container">
      <div className='left-side center'>
        <section className='images-section center'>
          <img className='main-image' src={images[0]} alt='voiture' />
          <div className='sub-image-container'>
            <div className='sub-image'> 
              {images.map((img, index) => (
                <img key={index} className='cars-image' src={img} alt='voiture' />
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className='right-side'>
        <h1>{element.brand}</h1>
        <h2 className='title'>{element.title}</h2>
        <div className='car-price'>
          <p>{element.price} €</p>
        </div>
        <div className='car-fiche'>
          <h2>Fiche Technique</h2>
          <p>Référence : {element.id}</p>
          <p>{element.description}</p>
        </div>
        <div className='contact-container'>
          <h2>Interéssé ? Contactez-nous</h2>
          <a href={'/carcontact/' + element.id}>
            <button className='shc-button'><BsEnvelopeFill size={35} /></button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Car;
