import './SecondHandCars.scss';
import '../../App.scss';
import CarFilter from '../../Components/SecondHandCars/Filter/CarFilter';
import CarList from '../../Components/SecondHandCars/List/CarList';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Vente = () => {
  const [carData, setCarData] = useState({
    cars: [],
    sortedCars: [],
    img: [],
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
      
      // collect images of cars from s3
      const imgResponse = await axios.get(`${process.env.REACT_APP_API}/carimage`);    
      const imageList = handleImages(imgResponse);
      setCarData((prev) => ({
        ...prev,
        img: imageList,
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

function handleImages (response) {
  const imgList = response.data.reduce((acc, image) => {
    const carId = image.car_id;
    const img = image.path;
    const list = JSON.parse(img).map((path) => `${process.env.REACT_APP_CAR_SCW_ENDPOINT}${path}`);
    if (acc[carId]) {
      acc[carId].push(...list);
    } else {
      acc[carId] = list;
    }
    return acc;
  }, {});
  return imgList;
}

export default Vente;