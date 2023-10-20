import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function AdminUpdateService(props) {
  const [service, setService] = useState('');

  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  const handleInputService = () => {
    props.onChangeService(service, props.id);
    setService('');
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
          <span>Nom du service</span>
            <input 
              type="text" 
              value={service}
              onChange={handleServiceChange}/>
          </div>
          <div className="actions">
            <button className="button" onClick={handleInputService}>Modifier</button>
          </div>
        </div>
      )}
  </Popup>
  )
}

export default AdminUpdateService;