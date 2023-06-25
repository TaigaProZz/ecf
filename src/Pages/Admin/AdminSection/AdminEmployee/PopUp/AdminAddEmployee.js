import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './AddEmployeePopUp.scss';

function AdminAddEmployee(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [permission, setPermission] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const generatePassword = () => {
    const generatedPassword = Math.random().toString(36).substring(2, 10);
    setPassword(generatedPassword);
  };

  const handlePermissionChange = (event) => {
    setPermission(event.target.value);
  };

  const handleAddEmployee = () => {
    const newEmployee = {
      name,
      email,
      password,
      permission
    };
    props.onAddEmployee(newEmployee);
    setName('');
    setEmail('');
    setPassword('');
    setPermission('');
  };
  return (
    <Popup trigger={props.btn} modal nested>
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">Ajouter un employé</div>
          <div className="content">
            <span>Nom prénom</span>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
            />
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <div className="password-container">
            <span>Mot de passe</span>
              <input
                type="text"
                value={password}
                readOnly
              />
              <button className="generate-password" onClick={generatePassword}>
                Générer
              </button>
            
            </div>
            <span>Permission</span>
            <input
              type="text"
              value={permission}
              onChange={handlePermissionChange}
            />
          </div>
          <div className="actions">
            <button className="add-employe-popup-btn" onClick={handleAddEmployee}>
              Ajouter
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default AdminAddEmployee;