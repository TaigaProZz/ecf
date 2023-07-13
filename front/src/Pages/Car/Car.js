import { Link, useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { BsEnvelopeFill } from 'react-icons/bs';
import axios from 'axios';
import './Car.scss';

function Car() {
  const [element, setElement] = useState(null);
  const [images, setImages] = useState([]);
  const params = useParams();

  // get infos of car from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carResponse = await axios.get(`${process.env.REACT_APP_API}/car/${params.id}`);
        const car = carResponse.data;
        setElement(car[0]);

        const imageResponse = await axios.get(`${process.env.REACT_APP_API}/carimage/${params.id}`);
        const images = imageResponse.data;
        const imageList = JSON.parse(images[0].path);
        console.log(imageList);
        setImages(imageList);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params.id]);

  // check if car is null
  if (!element) {
    return null;
  }

  const pathExtension = process.env.REACT_APP_CAR_SCW_ENDPOINT;

  return (
    <div className="car-page-container">
      <div className='left-side'>
        <section className='images-section'>
          <img className='main-image' src={pathExtension + images[0]} alt='voiture' />
          <div className='sub-image-container'>
            <div className='sub-image'> 
              {images.map((img, index) => (
                <img key={index} className='cars-image' src={pathExtension + img} alt='voiture' />
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className='right-side'>
        <h1>{element.brand} {element.model}</h1>
        <h2 className='title'>{element.title}</h2>
        <div className='car-price'>
          <p>{element.price} €</p>
        </div>
        <div className='car-fiche'>
          <h2>Fiche Technique</h2>
          <p className='ref'>Référence : {element.id}</p>
          <p>{element.description}</p>
        </div>
        <div className='car-contact-container'>
          <h2>Intéressé ? Contactez-nous</h2>
          <Link to={'/carcontact/' + element.id}>
            <button className='shc-button'><BsEnvelopeFill size={35} /></button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Car;
