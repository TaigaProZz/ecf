import './SecondHandCars.scss';
import '../../App.scss'
import { CARS } from '../../data/cars.js'
import React, { useState } from 'react';

const Vente = () => {
  const [cars] = useState(CARS);

  const style = {
    height: '70vh',
    width: '30%',
    backgroundColor: '#20273D',
    borderRadius:' 5px',
    padding: '10px',
    display: 'block',
    flexDirection: 'column'
  }

  // take input of price, year, km, 
  const sortCarsByPrice = () => {
    const priceOne = document.getElementById('price-one').value;
    const priceTwo = document.getElementById('price-two').value;
    cars.forEach((car) => {
      const carElement = document.getElementById(car.id);
      if (!(car.price >= priceOne && car.price <= priceTwo)) {
        carElement.style.display = 'none';

      } else {
        Object.keys(style).forEach((key) => {
          carElement.style[key] = style[key];
        });
      }
    });
  }

  return (
    <div className="container">
      <section className="section-sort">
        <label htmlFor="sort">Trier par :</label>
        <div className='price'>
          <p>Prix :</p>
          <input id='price-one' placeholder="Entre"></input>
          <input id='price-two' placeholder="Et"></input>
          <button className='sort-btn-price' onClick={sortCarsByPrice}>Trier par prix</button>
        </div>
        <div className='year'>
          <p>Année :</p>
          <input id='price-one' placeholder="Entre"></input>
          <input id='price-two' placeholder="Et"></input>
          <button className='sort-btn-year'>Trier par année</button>
        </div>
        <div className='km'>
          <p>Km :</p>
          <input id='price-one' placeholder="Entre"></input>
          <input id='price-two' placeholder="Et"></input>
          <button className='sort-btn-km'>Trier par km</button>
        </div>
      </section>

      <section className='section-car-list'>
        <ul className="car-list">
          {cars.map((car) => (
            <li key={car.id} className="car-item" style={style} id={car.id}>
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