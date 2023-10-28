import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function AdminUpdateCar(props) {
  const [car, setCar] = useState({ ...props.element });

  const handleCarChange = (key, value) => {
    // update car state with new value
    setCar((prevCar) => {
      return { ...prevCar, [key]: value };
    });
  };
  
  const handleInputCar = () => {
    const formData = new FormData();
    formData.append('id', car.car_id);
    formData.append('title', car.title);
    formData.append('brand', car.brand);
    formData.append('model', car.model);
    formData.append('description', car.description);
    formData.append('price', car.price);
    formData.append('km', car.km);
    formData.append('year', car.year);

    // parse data to parent component
    props.onUpdateCar(formData);
    setCar({ ...props.element });
  };

  return (
    <Popup trigger={props.btn} modal nested>
      {close => (
        <div className="admin-popup-modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">{props.type}</div>
          <div className="content">
            <span>Nom de la voiture</span>
              <input 
                type="text" 
                placeholder={props.element.title}
                onChange={(e) => handleCarChange('title', e.target.value)}
              />
              <span>Marque</span>
              <input 
                type="text" 
                placeholder={props.element.brand}
                onChange={(e) => handleCarChange('brand', e.target.value)}
              />
              <span>Modèle</span>
              <input 
                type="text" 
                placeholder={props.element.model}
                onChange={(e) => handleCarChange('model', e.target.value)}
              />
              <span>Description</span>
              <textarea 
                type="text" 
                placeholder={props.element.description}
                onChange={(e) => handleCarChange('description', e.target.value)}
              />
              <span>Prix</span>
              <input 
                type="text" 
                placeholder={props.element.price}
                onChange={(e) => handleCarChange('price', e.target.value)}
              />
              <span>Km</span>
              <input 
                type="text" 
                placeholder={props.element.km}
                onChange={(e) => handleCarChange('km', e.target.value)}
              />
              <span>Année</span>
              <input 
                type="text" 
                placeholder={props.element.year}
                onChange={(e) => handleCarChange('year', e.target.value)}
              />
              
          </div>
          <div className="actions">
            <button className="button" onClick={handleInputCar}>Modifier</button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default AdminUpdateCar;