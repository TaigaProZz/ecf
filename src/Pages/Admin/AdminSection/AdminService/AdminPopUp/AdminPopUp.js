import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './AdminPopUp.scss';

function AdminPopUp(props) {
  const [service, setService] = useState('');

  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  const handleAddService = () => {
    props.onAddService(service);
    setService('');
  };

  return (
    <Popup trigger={props.btn} modal nested>
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Ajouter un service </div>
          <div className="content">
            <input 
              type="text" 
              placeholder="Ajouter un service"  
              value={service}
              onChange={handleServiceChange}/>
          </div>
          <div className="actions">
            <button className="button" onClick={handleAddService}>Ajouter</button>
          </div>
        </div>
      )}
  </Popup>
  )
}

export default AdminPopUp;