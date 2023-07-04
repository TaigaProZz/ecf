import './SecondHandCars.scss';
import '../../App.scss'
import axios from 'axios';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Vente = () => {
  const [cars, setCars] = useState([]);
  const [img, setImg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carResponse = await axios.get('http://localhost:3307/car');
        setCars(carResponse.data);

        const imageResponse = await axios.get('http://localhost:3307/carimage');
        const imageList = imageResponse.data.reduce((acc, image) => {
          const carId = image.car_id;
          const img = image.path;
          const list = JSON.parse(img);    
          if (acc[carId]) {
            acc[carId].push(...list);
          } else {
            acc[carId] = list;
          }
          return acc;
        }, {});

        setImg(imageList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const style = {
    height: '70vh',
    width: '31%',
    backgroundColor: '#20273D',
    borderRadius: '12px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column'
  }

  const sortCars = () => {
    const priceOne = document.getElementById('price-one').value;
    const priceTwo = document.getElementById('price-two').value;
    const yearOne = document.getElementById('year-one').value;
    const yearTwo = document.getElementById('year-two').value;
    const kmOne = document.getElementById('km-one').value;
    const kmTwo = document.getElementById('km-two').value;
  
    cars.forEach((car) => {
      const carElement = document.getElementById(car.id);
      let displayCar = true;
  
      if (priceOne && priceTwo) {
        if (!(car.price >= priceOne && car.price <= priceTwo)) {
          displayCar = false;
        }
      }
  
      if (yearOne && yearTwo) {
        if (!(car.year >= yearOne && car.year <= yearTwo)) {
          displayCar = false;
        }
      }
  
      if (kmOne && kmTwo) {
        if (!(car.km >= kmOne && car.km <= kmTwo)) {
          displayCar = false;
        }
      }
  
      if (displayCar) {
        Object.keys(style).forEach((key) => {
          carElement.style[key] = style[key];
        });
      } else {
        carElement.style.display = 'none';
      }
    });
  };

  return (
    <div className="secondhand-container">
      <section className="section-sort">
        <h2 className='center' htmlFor="sort">Trier par :</h2>
          <div className='price'>
            <label>Prix :</label>
            <input id='price-one' className='sort-input' placeholder="Entre"></input>
            <input id='price-two' className='sort-input' placeholder="Et"></input>
          </div>
          <div className='year'>
            <label>Année :</label>
            <input id='year-one' className='sort-input' placeholder="Entre"></input>
            <input id='year-two' className='sort-input' placeholder="Et"></input>
          </div>
          <div className='km'>
            <label>Km :</label>
            <input id='km-one' className='sort-input' placeholder="Entre"></input>
            <input id='km-two' className='sort-input' placeholder="Et"></input>
          </div>
        <div className='center'>
          <button id='sort-btn-price' className='shc-button' onClick={sortCars}>Trier</button>
        </div>
      </section>

      <section className='section-car-list'>
        <ul className="car-list">
          {cars.map((car, index) => (      
            <li key={car.id} className="car-item" style={style} id={car.id}>
              <div className="car-details">
              <img src={img[car.id]?.[0]} alt={car.brand} className="car-image" />
                <div className='center'>
                  <h3>{car.brand}</h3>
                  <p>Modèle : {car.model}</p>
                  <p>Année : {car.year}</p>
                  <p>{car.km} km</p>
                  <p>Prix : {car.price} €</p>
                </div>
                <Link to={"/car/" + car.id}  >
                  <button className='shc-button'>Détails</button>
                </Link>          
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Vente;