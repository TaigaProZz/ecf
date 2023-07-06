import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { BsPlusSquare } from 'react-icons/bs';
import AdminAddEmployee from './PopUp/AdminAddEmployee';
import axios from 'axios';
import './AdminEmployee.scss';

function AdminEmployees () {
  const [employees, setEmployee] = useState(null);

  // get all employees
  const fetchData = async () => {
    const response = await axios.get('http://localhost:3307/employee');
    const result = response.data;
    setEmployee(result);
  }
  useEffect(() => {
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
      // send it to db
      await axios.post('http://localhost:3307/employee', {
          name: employee.name,
          email: employee.email,
          password: employee.password,
          permission: employee.permission,
      });
      // refresh data list
      fetchData();
    } catch (error) {
      alert("Erreur lors de l'envoi des données :", error);
    }
  };
  
  // const resetPassword = () => {
  //   console.log("password reset");
  // }

  return (
    <div className='admin-employee-container'>
      <div className='admin-employee'>
        <div className='admin-employee-categorie-row'>
          <span className='admin-employee-categorie-element'>Nom prénom</span>
          <span className='admin-employee-categorie-element'>Email</span>
          <span className='admin-employee-categorie-element'>Gérer</span>
        </div> 
        { employees.map((elt, index) => {
          return (
            <div key={index} className='admin-employee-list-row'>
              <span className='admin-employee-list-element'>{elt.name}</span>
              <span className='admin-employee-list-element'>{elt.email}</span>
              <span className='admin-employee-list-element'><FaPen size={30} /></span>
            </div> 
          )
          })}
      </div>
        <AdminAddEmployee
          btn={<button  className='admin-add-btn'>Ajouter un employé <BsPlusSquare size={30} /></button>}
          type='Ajouter un employé'
          onAddEmployee={addEmployee}
          >
        </AdminAddEmployee>
    </div>
  )
}

export default AdminEmployees;