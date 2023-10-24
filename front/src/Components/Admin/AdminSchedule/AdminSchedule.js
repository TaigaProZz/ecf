import 'react-toastify/dist/ReactToastify.css';
import { LiaSaveSolid } from 'react-icons/lia';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminSchedule () {
  const [schedule, setSchedule] = useState(null);
  const [modifiedSchedule, setModifiedSchedule] = useState(null);

  // fetch schedule
  const fetchData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/schedule`);
    const result = response.data
    setSchedule(result);
    setModifiedSchedule(result);
  }
  useEffect(() => {
    fetchData();
  }, []);

  if(schedule === null) {
    return;
  }

  // handle all inputs
  const handleMorningOpeningChange = (e, index) => {
    const updatedSchedule = [...modifiedSchedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      id: schedule[index].id,
      morning_opening: e.target.value,
    };
    setModifiedSchedule(updatedSchedule);
  };
  
  const handleMorningClosingChange = (e, index) => {
    const updatedSchedule = [...modifiedSchedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      id: schedule[index].id,
      morning_closing: e.target.value,
    };
    setModifiedSchedule(updatedSchedule);
  };
  
  const handleAfternoonOpeningChange = (e, index) => {
    const updatedSchedule = [...modifiedSchedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      id: schedule[index].id,
      afternoon_opening: e.target.value,
    };
    setModifiedSchedule(updatedSchedule);
  };
  
  const handleAfternoonClosingChange = (e, index) => {
    const updatedSchedule = [...modifiedSchedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      id: schedule[index].id,
      afternoon_closing: e.target.value,
    };
    setModifiedSchedule(updatedSchedule);
  };

  const handleSave = async () => {
    // and send it to db
    try {
      await toast.promise(
        axios.post(`${process.env.REACT_APP_API}/schedule`, modifiedSchedule),
        {
          pending: 'Enregistrement en cours...',
          success: {
            render({ data }) {
              setModifiedSchedule([]);
              fetchData();
              return `Données enregistrées avec succès !`;
            }
          },
          error: {
            render({ data }) {
              return `Erreur lors de l'enregistrement des données : ${data.error}`;
            }
          }
        }
      );     
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement des données :", error);
    }  
  };
  
  return (
    <>
      <header className='admin-header'>
        <button className='admin-button-add' onClick={handleSave}>Enregistrer <LiaSaveSolid size={24} /></button>
      </header>

      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th scope='col'> </th>
              <th scope='col'>Lundi</th>
              <th scope='col'>Mardi</th>
              <th scope='col'>Mercredi</th>
              <th scope='col'>Jeudi</th>
              <th scope='col'>Vendredi</th>
              <th scope='col'>Samedi</th>
              <th scope='col'>Dimanche</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Ouverture matin</th>
              {schedule.map((elt, index) => {
                return (
                  <td key={index}>
                    <input type="time" defaultValue={elt.morning_opening} onChange={(e) => handleMorningOpeningChange(e, index)}></input>
                  </td>
                );
              })}
            </tr>
            <tr>
              <th>Fermeture matin</th>
              {schedule.map((elt, index) => {
                return (
                  <td key={index}>
                    <input type="time" defaultValue={elt.morning_closing} onChange={(e) => handleMorningClosingChange(e, index)}></input>
                  </td>
                );
              })}
            </tr>
            <tr>
              <th>Ouverture après-midi</th>
              {schedule.map((elt, index) => {
                return (
                  <td key={index}>
                    <input type="time" defaultValue={elt.afternoon_opening} onChange={(e) => handleAfternoonOpeningChange(e, index)}></input>
                  </td>
                );
              })}
            </tr>
            <tr>
              <th>Fermeture après-midi</th>
              {schedule.map((elt, index) => {
                return (
                  <td key={index}>
                    <input type="time" defaultValue={elt.afternoon_closing} onChange={(e) => handleAfternoonClosingChange(e, index)}></input>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
} 

export default AdminSchedule;