import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { BsPlusSquare } from 'react-icons/bs';
import AdminAddEmployee from './PopUp/AdminAddEmployee';
import axios from 'axios';
import './AdminEmployee.scss';

function AdminEmployees () {
  const [employees, setEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3307/api/employee');
      const result = response.data;
      setEmployee(result);
    }
    fetchData();
  }, []);
  if(employees === null) {
    return;
  }

  // ADD SERVICE function
  const addEmployee = async (employee) => {
    // check if input are not null
    if (employee.name.trim() === '' || employee.email.trim() === '' || employee.permission.trim() === '') {
      alert('Veuillez remplir tous les champs');
      return;
    }
    // check type of variable
    if (typeof employee.name !== 'string' || typeof employee.email !== 'string' ) {
      alert('Vérifiez les informations');
    }
    try {
      const response = await axios.post('http://localhost:3307/api/postemployee', {
          name: employee.name,
          email: employee.email,
          password: employee.password,
          permission: employee.permission,
      });
  
      if (response.status === 200) {
        setEmployee([...employees, employee]);
      } else {
        alert("Erreur lors de l'envoi des données");
      }
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'envoi des données :", error);
    }
  };
  
  const resetPassword = () => {
    console.log("password reset");
  }

  return (
    <div className='employee-container'>
      <div className='employee'>
        <div className='employee-categorie-row'>
          <span className='employee-categorie-element-id'>ID</span>
          <span className='employee-categorie-element'>Nom prénom</span>
          <span className='employee-categorie-element'>Email</span>
          <span className='employee-categorie-element-password'>Mot de passe</span>
          <span className='employee-categorie-element-permission'>Permissions</span>
          <span className='employee-categorie-element-permission'>Gérer</span>
        </div> 
        { employees.map((elt, index) => {
          return (
            <div key={index} className='employee-list-row'>
              <span className='employee-list-element-id'>{elt.id}</span>
              <span className='employee-list-element-name'>{elt.name}</span>
              <span className='employee-list-element-email'>{elt.email}</span>
              <button className='employee-list-element-password' onClick={resetPassword}>Réinitialiser le mot de passe</button>
              <span className='employee-list-element-permission'>{elt.permission}</span>
              <span className='employee-list-element-permission'><FaPen size={30} /></span>
            </div> 
          )
          })}
      </div>
      <div className='admin-employee-btn'>
        <AdminAddEmployee
          btn={<button  className='add-employee-btn'>Ajouter un employé <BsPlusSquare size={30} /></button>}
          type='Ajouter un employé'
          onAddEmployee={addEmployee}
          >
        </AdminAddEmployee>
      </div>
    </div>
  )
}

export default AdminEmployees;