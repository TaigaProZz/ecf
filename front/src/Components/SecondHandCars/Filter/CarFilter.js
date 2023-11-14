import 'rc-slider/assets/index.css';
import './CarFilter.scss'
import Slider from 'rc-slider';
import { useEffect, useState } from 'react';

function CarFilter (props) {
  const maxPrice = 500000;
  const maxYear = 2023;
  const maxKm = 500000;

  const [priceValues, setPriceValues] = useState([1, maxPrice]);
  const [yearValues, setYearValues] = useState([1990, maxYear]);
  const [kmValues, setKmValues] = useState([1, maxKm]);

  const filterCars = (cars) => {
    return cars.filter((car) => {
      const priceInRange = car.price >= priceValues[0] && car.price <= priceValues[1];
      const yearInRange = car.year >= yearValues[0] && car.year <= yearValues[1];
      const kmInRange = car.km >= kmValues[0] && car.km <= kmValues[1];
      return priceInRange && yearInRange && kmInRange;
    });
  };

  useEffect(() => {
    const { carData, setCarData } = props;
    const filteredCars = filterCars(carData.cars);
    setCarData((prev) => ({
      ...prev,
      sortedCars: filteredCars,
    }));
  }, [priceValues, yearValues, kmValues]);

  const handlePriceChange = (values) => {
    setPriceValues(values);
  };

  const handleYearChange = (values) => {
    setYearValues(values);
  };

  const handleKmChange = (values) => {
    setKmValues(values);
  };

  const resetSort = () => {
    setPriceValues([1, maxPrice]);
    setYearValues([1990, maxYear]);
    setKmValues([1, maxKm]);
    props.setCarData((prev) => ({
      ...prev,
      sortedCars: props.carData.cars,
    }));
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
            max={maxPrice} 
            defaultValue={priceValues} 
            value={priceValues}
            onChange={value => handlePriceChange(value)} 
          />
        </div>
      </div>
      <div className='year'>
        <span>Année :</span>
        <div className='slider-container'>
          <p>{yearValues.map(value => value).join(' - ')}</p>
          <Slider 
            range={true}
            allowCross={true}
            min={1990} 
            max={maxYear} 
            defaultValue={yearValues} 
            value={yearValues}
            onChange={value => handleYearChange(value)} 
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
            max={maxKm} 
            defaultValue={kmValues} 
            value={kmValues}
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