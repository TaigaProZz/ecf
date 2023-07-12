import './AdminEmployee.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { BsPlusSquare } from 'react-icons/bs';
import AdminAddEmployee from './PopUp/AdminAddEmployee';
import AdminManageEmployee from './PopUp/AdminManageEmployee';
import axios from 'axios';

function AdminEmployees () {
  const [employees, setEmployee] = useState(null);

  // get all employees
  const fetchData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/employee`);
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
    // send it to db
    try {
      await toast.promise (
        axios.post(`${process.env.REACT_APP_API}/employee`, {
          name: employee.name,
          email: employee.email,
          password: employee.password,
          permission: employee.permission,
      }), {
        pending: 'Envoi des données...',
        success: {
          render({ data }) {
            fetchData();
            return 'Employé ajouté avec succès !';
          }
        },
        error: {
          render({ data }) {
            return `Erreur lors de l'envoi des données : ${data}`;
          }
        }
      }
    )
    } catch (error) {
      alert("Erreur lors de l'envoi des données :", error);
    }
  };

  // MANAGE SERVICE function
  const handleManageEmployee = async (newEmployee, originalEmployee) => {
    const finalEmployee = {
      name : '',
      email : '',
      permission : '',
    };

    // check if input changed from original
    if (newEmployee.name === originalEmployee.name || newEmployee.name === '') {
      finalEmployee.name = originalEmployee.name;
    } else {
      finalEmployee.name = newEmployee.name;
    }

    if (newEmployee.email === originalEmployee.email || newEmployee.email === '') {
      finalEmployee.email = originalEmployee.email;
    } else {
      finalEmployee.email = newEmployee.email;
    }

    if (newEmployee.permission === originalEmployee.permission 
      || newEmployee.permission === undefined 
      || newEmployee.permission === ''
      || newEmployee.permission === null
      ) {
      finalEmployee.permission = originalEmployee.permission;
    } else {
      finalEmployee.permission = newEmployee.permission;
    }
 
    try {
      await toast.promise (
        axios.put(`${process.env.REACT_APP_API}/employee/${originalEmployee.id}`, finalEmployee), {
          pending: 'Envoi des données...',
          success: {
            render({ data }) {
              fetchData();
              return 'Employé modifié avec succès !';
            }
          },
          error: {
            render({ data }) {
              return `Erreur lors de l'envoi des données : ${data}`;
            }
          }
        }
      )
    } catch (error) {
      alert("Erreur lors de l'envoi des données", error);
    }
  };
    
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
              <AdminManageEmployee
                  employee={elt}
                  btn={<div className='admin-employee-list-element'><FaPen  size={30} /></div>}
                  onManageEmployee={handleManageEmployee}
              >
              </AdminManageEmployee> 
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
        <ToastContainer 
          position= "bottom-right" 
          theme='dark'
        />
    </div>
  )
}

export default AdminEmployees;