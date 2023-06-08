import './Vente.scss';
import '../../App.scss'

import React, { useState } from 'react';
import { Row, Col, Button} from 'react-bootstrap';

const Vente = () => {
  const [cars, setCars] = useState([
    { id: 1, brand: 'Renault', year: '2020', price: 15000, image: 'https://images.caradisiac.com/images/7/4/3/6/197436/S0-serie-d-ete-comment-va-renault-722874.jpg' },
    { id: 2, brand: 'Toyota', year: '2023', price: 18000, image: 'https://www.shutterstock.com/image-illustration/tula-russia-june-24-2021-260nw-2013225725.jpg' },
    { id: 3, brand: 'Ford', year: '2015', price: 25000, image: 'https://www.speedest.fr/medias/vehicules/933/img-5819.jpg' },
    { id: 4, brand: 'Ferrari', year: '2010', price: 28000, image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80' },
    { id: 5, brand: 'Citroen', year: '2015', price: 25000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Citroen_e-C4_Auto_Zuerich_2021_IMG_0242.jpg/2560px-Citroen_e-C4_Auto_Zuerich_2021_IMG_0242.jpg' },
    { id: 6, brand: 'Peugeot', year: '2010', price: 28000, image: 'https://images.caradisiac.com/images/5/5/8/2/195582/S0-peugeot-est-le-constructeur-prefere-des-francais-en-toute-subjectivite-711529.jpg' },
  ]);

  const [sortBy, setSortBy] = useState('');

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortCars = () => {
    const sortedCars = [...cars];
    switch (sortBy) {
      case 'brand':
        sortedCars.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case 'year':
        sortedCars.sort((a, b) => a.year.localeCompare(b.year));
        break;
      case 'price':
        sortedCars.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
    setCars(sortedCars);
  };

  return (
    <div className="containerList">
      <Row>
        <Col sm={2}>
          <div className="select-container">
            <label htmlFor="sort">Trier par :</label>
            <select id="sort" onChange={handleSortChange}>
              <option value="price">Prix</option>
              <option value="year">Année</option>
              <option value="brand">Marque</option>
            </select>
            <button onClick={sortCars}>Trier</button>
          </div>
        </Col>

        <Col sm={10}>
        <ul className="car-list">
          {cars.map((car) => (
            <li key={car.id} className="car-item">
              <div className="car-details">
                <img src={car.image} alt={car.brand} className="car-image" />
                <div>
                  <h3>{car.brand}</h3>
                  <p>Modèle : {car.model}</p>
                  <p>Année : {car.year}</p>
                  <p>Prix : {car.price} €</p>
                </div>
                <Button>Contacter</Button>
              </div>
            </li>
          ))}
        </ul>
        </Col>
      </Row>
    </div>
  );

};


export default Vente;