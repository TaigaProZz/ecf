import './SecondHandCars.scss';
import '../../App.scss';
import CarFilter from '../../Components/SecondHandCars/Filter/CarFilter';
import CarList from '../../Components/SecondHandCars/List/CarList';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SecondHandCars = () => {
  const [carData, setCarData] = useState({
    cars: [],
    sortedCars: []
  });

  // fetch cars and images from database
  const fetchData = async () => {
    try {
      // collect info of cars from db
      const response = await axios.get(`${process.env.REACT_APP_API}/car`);
      setCarData(prev => ({
        ...prev,
        cars: response.data,
        sortedCars: response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {  
    fetchData();
  }, []);

  return (
    <div className="secondhand-container">
      <CarFilter 
        carData={carData}
        setCarData={setCarData}
      />
      <div className="section-car-list">
        <CarList
          carData={carData}
        />
      </div>
    </div>
  );
};

export default SecondHandCars;