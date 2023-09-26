import './CarList.scss'
import { Link } from 'react-router-dom';
import CarItem from '../CarItem/CarItem';

function CarList (props) {
  return (
    <div className='car-list'>
      { props.carData.sortedCars.map((car) => {
        return (
          <>
            {(car.length === 0) ? <div className='loading-sch'>Chargement...</div> : (
              <div className="car-item" id={car.id}>
                <Link to={"/car/" + car.id}>    
                  <CarItem key={car.id} car={car} img={props.carData.img} />
                </Link> 
              </div>
            )}
          </>
        )
      })}
    </div>
  );
}

export default CarList;