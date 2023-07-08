import './SecondHandCars.scss';
import '../../App.scss'
import axios from 'axios';
import { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

const Vente = () => {
  const [cars, setCars] = useState([]);
  const [sortedCars, setSortedCars] = useState([]); 
  const [img, setImg] = useState([]);
  const priceOneInput = useRef();
  const priceTwoInput = useRef();
  const yearOneInput = useRef();
  const yearTwoInput = useRef();
  const kmOneInput = useRef(); 
  const kmTwoInput = useRef(); 

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
    const priceOne = priceOneInput.current.value;
    const priceTwo = priceTwoInput.current.value;
    const yearOne = yearOneInput.current.value;
    const yearTwo = yearTwoInput.current.value;
    const kmOne = kmOneInput.current.value;
    const kmTwo = kmTwoInput.current.value;

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
      return car;
    });
    setSortedCars(filteredCars);
  };

  const resetSort = () => {
    const sortedCars = [...cars];
    setSortedCars(sortedCars);
    priceOneInput.current.value = "";
    priceTwoInput.current.value = "";
    yearOneInput.current.value = "";
    yearTwoInput.current.value = "";
    kmOneInput.current.value = "";
    kmTwoInput.current.value = "";
  };


  return (
    <div className="secondhand-container">
      <section className="section-sort">
        <h2 className='center' htmlFor="sort">Trier par :</h2>
          <div className='price'>
              <label>Prix :</label>
              <input ref={priceOneInput} type='number' min={0}  className='sort-input' placeholder="Entre" onChange={sortCars}></input>
              <input ref={priceTwoInput} type='number' min={0} className='sort-input' placeholder="Et" onChange={sortCars}></input>
            </div>
            <div className='year'>
              <label>Année :</label>
              <input ref={yearOneInput} type='number' min={0} className='sort-input' placeholder="Entre" onChange={sortCars}></input>
              <input ref={yearTwoInput} type='number' min={0} className='sort-input' placeholder="Et" onChange={sortCars}></input>
            </div>
            <div className='km'>
              <label>Km :</label>
              <input ref={kmOneInput} type='number' min={0} className='sort-input' placeholder="Entre" onChange={sortCars}></input>
              <input ref={kmTwoInput} type='number' min={0} className='sort-input' placeholder="Et" onChange={sortCars}></input>
            </div>
          <div className='center'>
            <button id='sort-btn-price' className='shc-button' onClick={resetSort}>Réinitialiser le tri</button>
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