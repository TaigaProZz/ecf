import './CarList.scss'
import { Link } from 'react-router-dom';
import CarItem from '../CarItem/CarItem';
import React from 'react';

function CarList (props) {
  return (
    <div className='car-list'>
      { props.carData.sortedCars.map((car) => {
        return (
          // prevent duplicate key error with react fragment
          <React.Fragment key={car.id}>
            {(car.length === 0) ? <div className='loading-sch'>Chargement...</div> : 
            (
              <div className="car-item" id={car.id} key={car.id}>
                <Link to={"/car/" + car.id}>    
                  <CarItem car={car} img={props.carData.img} />
                </Link> 
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  );
}

export default CarList;