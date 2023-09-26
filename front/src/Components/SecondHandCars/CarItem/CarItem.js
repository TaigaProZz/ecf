import './CarItem.scss';

function CarItem (props) {
  const { car, img } = props;
  return (
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
  )
}

export default CarItem;