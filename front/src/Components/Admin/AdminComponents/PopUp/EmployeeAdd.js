import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../../AdminComponents/PopUp/AdminPopUp.scss';

function AdminAddEmployee(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [permission, setPermission] = useState("0");

  // handle inputs
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePermissionChange = (event) => {
    setPermission(event.target.value);
  };

  // generate password
  const generatePassword = () => {
    const generatedPassword = Math.random().toString(36).substring(2, 10);
    setPassword(generatedPassword);
  };

  const handleOnSubmit = () => {
    const newEmployee = {
      name,
      email,
      password,
      permission
    }; 
    props.onSubmit(newEmployee);
  };
  
  return (
    <Popup trigger={props.btn} modal nested>
      {close => (
        <div className="admin-popup-modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">Ajouter un employé</div>
          <div className="content">
            <label htmlFor='name'>Nom prénom</label>
            <input
              type="text"
              id='name'
              value={name}
              onChange={handleNameChange}
            />
            <label htmlFor='email'>Email</label>
            <input
              type="email"
              id='email'
              value={email}
              onChange={handleEmailChange}
            />
            <label htmlFor='permission'>Permission</label>
            <select onChange={handlePermissionChange} value={permission} id='permission'>
              <option value= "0">Utilisateur</option>
              <option value= "1">Admin</option>
            </select>
            <div className="password-container">
              <label htmlFor='password'>Mot de passe ( Attention : n'oubliez pas de bien noter le mot de passe généré, il vous sera impossible de le récuperer )</label>
              <input
                type="text"
                id='password'
                value={password}
                placeholder='Cliquez sur "Générer" pour créer un mot de passe'
                readOnly
              />
              <button className="generate-password" onClick={generatePassword}>
                Générer
              </button>
            </div>
          </div>
          <div className="actions">
            <button className="add-popup-btn" onClick={handleOnSubmit}>
              Ajouter
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default AdminAddEmployee;