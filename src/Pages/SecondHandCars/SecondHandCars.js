import './SecondHandCars.scss';
import '../../App.scss'
import { CARS } from '../../data/cars.js'
import React, { useState } from 'react';

const Vente = () => {
  const [cars] = useState(CARS);

  // const [sortBy, setSortBy] = useState('');

  // const handleSortChange = (event) => {
  //   setSortBy(event.target.value);
  // };

  // const sortCars = () => {
  //   const sortedCars = [...cars];
  //   switch (sortBy) {
  //     case 'brand':
  //       sortedCars.sort((a, b) => a.brand.localeCompare(b.brand));
  //       break;
  //     case 'year':
  //       sortedCars.sort((a, b) => a.year.localeCompare(b.year));
  //       break;
  //     case 'price':
  //       sortedCars.sort((a, b) => a.price - b.price);
  //       break;
  //     default:
  //       break;
  //   }
  //   setCars(sortedCars);
  // };

  return (
    <div className="container">
      <section className="section-sort">
        <label htmlFor="sort">Trier par :</label>
        <div className='price'>
          <p>Prix :</p>
          <input id='price-one' placeholder="Entre"></input>
          <input id='price-two' placeholder="Et"></input>
        </div>
        <div className='year'>
          <p>Année :</p>
          <input id='price-one' placeholder="Entre"></input>
          <input id='price-two' placeholder="Et"></input>
        </div>
        <div className='km'>
          <p>Km :</p>
          <input id='price-one' placeholder="Entre"></input>
          <input id='price-two' placeholder="Et"></input>
        </div>
        <button>Trier</button>
      </section>

      <section className='section-car-list'>
        <ul className="car-list">
          {cars.map((car) => (
            <li key={car.id} className="car-item">
              <div className="car-details">
                <img src={car.image[0]} alt={car.brand} className="car-image" />
                <div className='center'>
                  <h3>{car.brand}</h3>
                  <p>Modèle : {car.model}</p>
                  <p>Année : {car.year}</p>
                  <p>Prix : {car.price} €</p>
                </div>
                <a href={"/car/"+car.id}>
                  <button className='btn'>Détails</button>
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