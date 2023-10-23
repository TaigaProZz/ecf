import './AdminSchedule.scss';
import 'react-toastify/dist/ReactToastify.css';
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
  const handleMorningOpeningBlur = (e, index) => {
    const updatedSchedule = [...modifiedSchedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      id: schedule[index].id,
      morning_opening: e.target.value,
    };
    setModifiedSchedule(updatedSchedule);
  };
  
  const handleMorningClosingBlur = (e, index) => {
    const updatedSchedule = [...modifiedSchedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      id: schedule[index].id,
      morning_closing: e.target.value,
    };
    setModifiedSchedule(updatedSchedule);
  };
  
  const handleAfternoonOpeningBlur = (e, index) => {
    const updatedSchedule = [...modifiedSchedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      id: schedule[index].id,
      afternoon_opening: e.target.value,
    };
    setModifiedSchedule(updatedSchedule);
  };
  
  const handleAfternoonClosingBlur = (e, index) => {
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
    <div className="admin-schedule-container">
      <div className="admin-schedule">
        {schedule.map((elt, index) => {
          return (         
            <div key={index} className='admin-day-row'>
              <h3 className='admin-day-name'>{elt.day}</h3>
              <div className='admin-morning-container'>
                <div className='admin-day-input'>
                  <label>Matin de</label>
                  <input placeholder={elt.morning_opening} 
                    defaultValue={elt.morning_opening}
                    onChange={(e) => handleMorningOpeningBlur(e, index)}
                    />
                </div>
                <div className='admin-day-input'>
                  <label>à</label>
                  <input placeholder={elt.morning_closing}
                    defaultValue={elt.morning_closing}
                    onChange={(e) => handleMorningClosingBlur(e, index)}
                  />
                </div>
              </div>
              <div className='admin-afternoon-container'>
                <div className='admin-day-input'>
                  <label>Après-midi de</label>
                  <input placeholder={elt.afternoon_opening}
                    defaultValue={elt.afternoon_opening}
                    onChange={(e) => handleAfternoonOpeningBlur(e, index)}
                  />
                </div>
                <div className='admin-day-input'>
                  <label>à</label>
                  <input placeholder={elt.afternoon_closing} 
                    defaultValue={elt.afternoon_closing}
                    onChange={(e) => handleAfternoonClosingBlur(e, index)}
                  />
                </div>   
              </div>
            </div> 
          )
        })}
        <button  onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
} 

export default AdminSchedule;