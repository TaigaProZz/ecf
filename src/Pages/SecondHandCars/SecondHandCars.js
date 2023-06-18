import './SecondHandCars.scss';
import '../../App.scss'
import axios from 'axios';
import { useState, useEffect} from 'react';

const Vente = () => {
  const [cars, setCars] = useState([]);
  const [img, setImg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.baseURL = 'http://localhost:3307';
        const response = await axios.get('/api/cars');
        setCars(response.data);

        const imageList = response.data.map(car => {
          const img = car.images;
          const list = JSON.parse(img);
          return list;
        });

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
    <div className="container">
      <section className="section-sort">
        <h2 className='center' htmlFor="sort">Trier par :</h2>
        <div className='price'>
          <p>Prix :</p>
          <input id='price-one' className='sort-input' placeholder="Entre"></input>
          <input id='price-two' className='sort-input' placeholder="Et"></input>
        </div>
        <div className='year'>
          <p>Année :</p>
          <input id='year-one' className='sort-input' placeholder="Entre"></input>
          <input id='year-two' className='sort-input' placeholder="Et"></input>
        </div>
        <div className='km'>
          <p>Km :</p>
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
                <img src={img[index]} alt={car.brand} className="car-image" />
                <div className='center'>
                  <h3>{car.brand}</h3>
                  <p>Modèle : {car.model}</p>
                  <p>Année : {car.year}</p>
                  <p>{car.km} km</p>
                  <p>Prix : {car.price} €</p>
                </div>
                <a href={"/car/" + car.id}>
                  <button className='shc-button'>Détails</button>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Vente;