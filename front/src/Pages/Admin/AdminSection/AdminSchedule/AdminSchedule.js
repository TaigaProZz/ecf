import './AdminSchedule.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminSchedule () {
  const [schedule, setSchedule] = useState(null);
  const [modifiedSchedule, setModifiedSchedule] = useState([]);

  // fetch schedule
  const fetchData = async () => {
    const response = await axios.get(`ecf-node-serv.vercel.app:3307/schedule`);
    const result = response.data
    setSchedule(result);
  }
  useEffect(() => {
    fetchData();
  }, []);

  if(schedule === null) {
    return;
  }

  // handle all inputs
  const handleMorningOpeningBlur = (e, index) => {
    // copy the original array 
    const updatedSchedule = [...modifiedSchedule];
    // update schedule by ID selected from input
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      id: schedule[index].id,
      morningOpening: e.target.value,
    };
    setModifiedSchedule(updatedSchedule);
  };
  
  const handleMorningClosingBlur = (e, index) => {
    const updatedSchedule = [...modifiedSchedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      id: schedule[index].id,
      morningClosing: e.target.value,
    };
    setModifiedSchedule(updatedSchedule);
  };
  
  const handleAfternoonOpeningBlur = (e, index) => {
    const updatedSchedule = [...modifiedSchedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      id: schedule[index].id,
      afternoonOpening: e.target.value,
    };
    setModifiedSchedule(updatedSchedule);
  };
  
  const handleAfternoonClosingBlur = (e, index) => {
    const updatedSchedule = [...modifiedSchedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      id: schedule[index].id,
      afternoonClosing: e.target.value,
    };
    setModifiedSchedule(updatedSchedule);
  };

  const handleSave = async () => {
    const updates = modifiedSchedule.map((data, index) => {
      const scheduleItem = schedule[index];
      const updateItem = {
        id: data.id,
      };
      // check if inputs are empty. if empty, dont update it and keep original, or take new value to update it
      if (data.morningOpening !== "") {
        updateItem.morningOpening = data.morningOpening || scheduleItem.morning_opening;
      }
      if (data.morningClosing !== "") {
        updateItem.morningClosing = data.morningClosing || scheduleItem.morning_closing;
      }
      if (data.afternoonOpening !== "") {
        updateItem.afternoonOpening = data.afternoonOpening || scheduleItem.afternoon_opening;
      }
      if (data.afternoonClosing !== "") {
        updateItem.afternoonClosing = data.afternoonClosing || scheduleItem.afternoon_closing;
      }
      return updateItem;
    });
    // and send it to db
    try {
      await axios.post(`ecf-node-serv.vercel.app:3307/schedule`, updates);
      setModifiedSchedule([]);
      fetchData();
      alert("Données enregistrées avec succès !");
    } catch (error) {
      alert("Erreur lors de l'enregistrement des données :", error);
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
                    onBlur={(e) => handleMorningOpeningBlur(e, index)}
                    />
                </div>
                <div className='admin-day-input'>
                  <label>à</label>
                  <input placeholder={elt.morning_closing}
                    onBlur={(e) => handleMorningClosingBlur(e, index)}
                  />
                </div>
              </div>
              <div className='admin-afternoon-container'>
                <div className='admin-day-input'>
                  <label>Après-midi de</label>
                  <input placeholder={elt.afternoon_opening}
                    onBlur={(e) => handleAfternoonOpeningBlur(e, index)}
                  />
                </div>
                <div className='admin-day-input'>
                  <label>à</label>
                  <input placeholder={elt.afternoon_closing} 
                    onBlur={(e) => handleAfternoonClosingBlur(e, index)}
                  />
                </div>   
              </div>
            </div> 
          )
        })}
        <button className='admin-add-btn' onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
} 

export default AdminSchedule;