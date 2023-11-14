import 'react-toastify/dist/ReactToastify.css';
import AdminAddEmployee from '../AdminComponents/PopUp/EmployeeAdd';
import AdminManageEmployee from '../AdminComponents/PopUp/EmployeeManage';
import { toast } from 'react-toastify';
import { FaRegEdit } from 'react-icons/fa';
import { BsPlusSquare } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ValidatePopUp from '../AdminComponents/PopUp/ValidatePopUp';
import { IoTrashBinOutline } from 'react-icons/io5';

function AdminEmployees () {
  const [employees, setEmployee] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  // ADD EMPLOYEE function
  const handleSubmit = async (employee) => {
    // check if input are not null
    if (employee.name.trim() === '' || employee.email.trim() === '' || employee.permission.trim() === '') {
      toast.warn('Veuillez remplir tous les champs');
      return;
    }
    // check type of variable
    if (typeof employee.name !== 'string' || typeof employee.email !== 'string' ) {
      toast.warn('Vérifiez les informations');
      return;
    }

    // check email format
    if (!validateEmail(employee.email)) {
      toast.error('L\'adresse e-mail n\'est pas valide');
      return;
    }

    // send it to db
    try {
      await toast.promise (
        axios.post(`${process.env.REACT_APP_API}/employee`, {
          name: employee.name,
          email: employee.email,
          password: employee.password,
          permission: employee.permission,
      }), 
      {
        pending: 'Envoi des données...',
        success: {
          render() {  
            fetchData();
            return 'Employé ajouté avec succès !';
          }
        },
        error: {
          render({data}) {
            return `Erreur lors de l'envoi des données : ${data}`;
          }
        }
      }
    )
    } catch (error) {
      toast.error("Erreur lors de l'envoi des données :", error);
    }
  };

  // MANAGE EMPLOYEE function
  const handleManageEmployee = async (newEmployee, originalEmployee) => {
    const finalEmployee = {
      name: newEmployee.name || originalEmployee.name,
      email: newEmployee.email || originalEmployee.email,
      permission: newEmployee.permission || originalEmployee.permission,
    };

    try {
      await toast.promise (
        axios.put(`${process.env.REACT_APP_API}/employee/${originalEmployee.id}`, finalEmployee), {
          pending: 'Envoi des données...',
          success: {
            render() {
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
      toast.error("Erreur lors de l'envoi des données", error);
    }
  };
  
  
  // DELETE EMPLOYEE function
  const deleteEmployee = async (choice, id) => { 
    if(choice === 'valider') {
      try {
        await toast.promise (
          axios.delete(`${process.env.REACT_APP_API}/employee/` + id),
          {
            pending: 'Suppression de l\'employé...',
            success: {
              render() {
                fetchData();
                return 'Employé supprimé';
              }
            },
            error: {
              render({ data }) {
                return `Erreur lors de la suppression : ${data}`;
              }
            }
          }
        )
      } catch (error) {
        toast.error('Erreur lors de la suppression', error);
      }
      setShowConfirmation(false);
    }
  }

  return (
    <>
      <header className='admin-header'>
        <AdminAddEmployee
          btn={<button className='admin-button-add'>Ajouter un employé <BsPlusSquare size={24} /></button>}
          type='Ajouter un employé'
          onSubmit={handleSubmit}
        />      
      </header>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Nom prénom</th>
              <th>Email</th>
              <th>Gérer</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((elt) => {
              return (
                <tr key={elt.id}>
                  <td>{elt.name}</td>
                  <td>{elt.email}</td>
                  <td>
                    <AdminManageEmployee
                      employee={elt}
                      btn={<div><FaRegEdit size={24} /></div>}
                      onManageEmployee={handleManageEmployee}
                    />
                  </td>
                  <td>
                    <ValidatePopUp
                      btn={<div><IoTrashBinOutline size={24} /></div>} 
                      onConfirmation={(choice) => {deleteEmployee(choice, elt.id)}} 
                      txt={"supprimer"}
                      handleButtonClick={showConfirmation}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
    
  )
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
  return regex.test(email);
}


export default AdminEmployees;