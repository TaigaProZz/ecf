import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../../AdminComponents/PopUp/AdminPopUp.scss';
import ValidatePopUp from '../../AdminComponents/PopUp/ValidatePopUp';

function AdminManageEmployee(props) {
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState(null);

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  // }

  const handlePermission = (e) => {
    setPermission(e.target.value);
  }

  // save changes
  const handleConfirmation = (choice) => {
    if (choice === 'valider') {
      const employee = {
        name : name,
        email : email,
        permission : permission
      };
      props.onManageEmployee(employee, props.employee);
    }
  };
  
  return (
    <Popup trigger={props.btn} modal nested>
      {close => (
        <div className="admin-popup-modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">Modifier un employé</div>
          <div className="content">
            <label>Nom prénom</label>
            <input
              type="text"
              placeholder={props.employee.name}
              value = {name}
              onChange={handleName}
            />

            <label>Email</label>
            <input
              type="text"
              placeholder={props.employee.email}
              value = {email}
              onChange={handleEmail}
            />

            <label>Mot de passe</label>
            <button className="add-popup-btn">
              Réinitialiser le mot de passe
            </button>

            <label>Permission</label>
            <span>Permission actuelle : {props.employee.permission ? "Admin" : "Employe"}</span>
            <select onChange={handlePermission} value={permission}>
              <option value= ''>-- Laissez vide pour ne pas modifier</option>
              <option value= "0">Utilisateur</option>
              <option value= "1">Admin</option>
            </select>
          </div>
          <div className="actions">
            <ValidatePopUp
              onConfirmation={(choice) => handleConfirmation(choice, props.employee.name)}
              btn={<button className="add-popup-btn">Modifier</button>}
              txt='modifier les changements'
              handleButtonClick={showConfirmation}
            >
            </ValidatePopUp>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default AdminManageEmployee;