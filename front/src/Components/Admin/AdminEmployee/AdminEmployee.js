import 'react-toastify/dist/ReactToastify.css';
import AdminAddEmployee from '../AdminComponents/PopUp/EmployeeAdd';
import AdminManageEmployee from '../AdminComponents/PopUp/EmployeeManage';
import { toast } from 'react-toastify';
import { FaPen, FaRegEdit } from 'react-icons/fa';
import { BsPlusSquare } from 'react-icons/bs';
import { useEffect, useState } from 'react';
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

  // MANAGE SERVICE function
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
                      btn={<FaRegEdit size={24} />}
                      onManageEmployee={handleManageEmployee}
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

export default AdminEmployees;