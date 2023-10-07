import 'rc-slider/assets/index.css';
import './CarFilter.scss'
import Slider from 'rc-slider';
import { useState } from 'react';

function CarFilter (props) {
  const [priceValues, setPriceValues] = useState([1, 200000]);
  const [yearValues, setYearValues] = useState([1990, 2023]);
  const [kmValues, setKmValues] = useState([1, 800000]);

  const handlePriceChange = (values) => {
    setPriceValues(values);
    const filteredCars = filterCars(props.carData.cars);
    props.setCarData((prev) => ({
      ...prev,
      sortedCars: filteredCars,
    }));
  };

  const handleKmChange = (values) => {
    setKmValues(values);
    const filteredCars = filterCars(props.carData.cars);
    props.setCarData((prev) => ({
      ...prev,
      sortedCars: filteredCars,
    }));
  };

  const handleYearChange = (values) => {
    setYearValues(values);
    const filteredCars = filterCars(props.carData.cars);
    props.setCarData((prev) => ({
      ...prev,
      sortedCars: filteredCars,
    }));
  };

  const resetSort = () => {
    setPriceValues([1, 200000]);
    setYearValues([1990, 2023]);
    setKmValues([1, 800000]);
    props.setCarData((prev) => ({
      ...prev,
      sortedCars: props.carData.cars,
    }));
  };

  const filterCars = (cars) => {
    return cars.filter((car) => {
      const priceInRange = car.price >= priceValues[0] && car.price <= priceValues[1];
      const yearInRange = car.year >= yearValues[0] && car.year <= yearValues[1];
      const kmInRange = car.km >= kmValues[0] && car.km <= kmValues[1];
      return priceInRange && yearInRange && kmInRange;
    });
  };

  return (
    <section className="section-sort">
      <h2 className='center' htmlFor="sort">Trier par :</h2>
      <div className='price'>
        <span>Prix :</span>
        <div className='slider-container'>
          <p>{priceValues.map(value => value + "€").join(' - ')}</p>
          <Slider 
            range={true}
            allowCross={false}
            min={1} 
            max={200000} 
            defaultValue={priceValues} 
            onChange={handlePriceChange} 
          />
        </div>
      </div>
      <div className='year'>
        <span>Année :</span>
        <div className='slider-container'>
          <p>{yearValues.map(value => value).join(' - ')}</p>
          <Slider 
            range={true}
            allowCross={false}
            min={1990} 
            max={2023} 
            defaultValue={yearValues} 
            onChange={handleYearChange} 
          />
        </div>
      </div>
      <div className='km'>
        <span>Km :</span>
        <div className='slider-container'>
          <p>{kmValues.map(value => value + "km").join(' - ')}</p>
          <Slider 
            range={true}
            allowCross={false}
            min={0} 
            max={800000} 
            defaultValue={kmValues} 
            onChange={handleKmChange} 
          />
        </div>
      </div>
      <div className='center'>
        <button id='sort-btn-price' className='shc-button' onClick={resetSort}>Réinitialiser le tri</button>
      </div>   
    </section>
  )
}

export default CarFilter;