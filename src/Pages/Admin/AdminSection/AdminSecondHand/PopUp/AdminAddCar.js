import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './AddCarPopUp.scss';

function AdminAddCar(props) {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [km, setKm] = useState('');
  const [year, setYear] = useState('');
  const [images, setImages] = useState([]);


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleKmChange = (event) => {
    setKm(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleImagesChange = (event) => {
    setImages(event.target.value);
  };

  const handleAddCar = () => {
    const newCar = {
      title,
      brand,
      model,
      description,
      price,
      km,
      year,
      images
    };
    props.onAddCar(newCar);
  };

  return (
    <Popup trigger={props.btn} modal nested>
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">Ajouter une voiture</div>
          <div className="content">
            <span>Titre</span>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
            <span>Marque</span>
            <input
              type="text"
              value={brand}
              onChange={handleBrandChange}
            />
            <span>Modèle</span>
            <input
              type="text"
              value={model}
              onChange={handleModelChange}
            />
            <span>Description</span>
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
            />
            <span>Prix</span>
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
            />
            <span>Kilométrage</span>
            <input
              type="text"
              value={km}
              onChange={handleKmChange}
            />
            <span>Année</span>
            <input
              type="text"
              value={year}
              onChange={handleYearChange}
            />
            <span>Images</span>
            <input
              type="text"
              value={images}
              onChange={handleImagesChange}
            />
          </div>
          <div className="actions">
            <button className="add-car-popup-btn" onClick={handleAddCar}>
              Ajouter
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default AdminAddCar;