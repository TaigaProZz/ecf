import './SecondHandCars.scss';
import '../../App.scss'
import axios from 'axios';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Vente = () => {
  const [cars, setCars] = useState([]);
  const [sortedCars, setSortedCars] = useState([]); 
  const [img, setImg] = useState([]);

  // fetch cars and images from database
  const fetchData = async () => {
    try {
      const carResponse = await axios.get('http://localhost:3307/car');
      setCars(carResponse.data);
      setSortedCars(carResponse.data);

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

  useEffect(() => {  
    fetchData();
  }, []);
  
  const sortCars = () => {
    // // get all inputs
    const priceOne = document.getElementById('price-one').value;
    const priceTwo = document.getElementById('price-two').value;
    const yearOne = document.getElementById('year-one').value;
    const yearTwo = document.getElementById('year-two').value;
    const kmOne = document.getElementById('km-one').value;
    const kmTwo = document.getElementById('km-two').value;

    // and sort cars
    const sortedCars = [...cars];
    const filteredCars = sortedCars.filter((car) => {
      if (priceOne && priceTwo) {
        return car.price >= priceOne && car.price <= priceTwo;
      }
      if (yearOne && yearTwo) {
        return car.year >= yearOne && car.year <= yearTwo;
      }
      if (kmOne && kmTwo) {
        return car.km >= kmOne && car.km <= kmTwo;
      }
    });
    setSortedCars(filteredCars);
  };

  return (
    <div className="secondhand-container">
      <section className="section-sort">
        <h2 className='center' htmlFor="sort">Trier par :</h2>
          <div className='price'>
            <label>Prix :</label>
            <input id='price-one' className='sort-input' placeholder="Entre" onChange={sortCars}></input>
            <input id='price-two' className='sort-input' placeholder="Et" onChange={sortCars}></input>
          </div>
          <div className='year'>
            <label>Année :</label>
            <input id='year-one' className='sort-input' placeholder="Entre" onChange={sortCars}></input>
            <input id='year-two' className='sort-input' placeholder="Et" onChange={sortCars}></input>
          </div>
          <div className='km'>
            <label>Km :</label>
            <input id='km-one' className='sort-input' placeholder="Entre" onChange={sortCars}></input>
            <input id='km-two' className='sort-input' placeholder="Et" onChange={sortCars}></input>
          </div>
        <div className='center'>
          <button id='sort-btn-price' className='shc-button' onClick={sortCars}>Trier</button>
        </div>
      </section>
     
      <section className='section-car-list'>
        <ul className="car-list">
          {sortedCars.map((car, index) => (      
            <li key={car.id} className="car-item" id={car.id} >
              <Link to={"/car/" + car.id}>
                <div className="car-details">
                <img src={img[car.id]?.[0]} alt={car.brand} className="car-image" />
                  <div className='secondhand-car-details'>
                    <div className='secondhand-car-description'>
                      <h3>{car.brand}</h3>
                      <p>Modèle : {car.model}</p>
                      <p>Année : {car.year}</p>
                      <p>{car.km} km</p>
                    </div>
                    <div className='secondhand-car-button'>
                      <p className='car-price-shape'>{car.price} €</p>
                    </div>
                  </div>     
                </div>
              </Link> 
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Vente;