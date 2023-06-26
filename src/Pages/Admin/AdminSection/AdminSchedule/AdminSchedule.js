import './AdminSchedule.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminSchedule () {
  const [schedule, setSchedule] = useState(null);
  const [modifiedSchedule, setModifiedSchedule] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3307/api/schedule");
      const result = response.data
      setSchedule(result);
    }
    fetchData();
  }, []);

  if(schedule === null) {
    return;
  }

  const handleMorningOpeningBlur = (e, index) => {
    const updatedSchedule = [...modifiedSchedule];
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
    try {
      const updates = modifiedSchedule.map((data, index) => {
        const scheduleItem = schedule[index];
        const updateItem = {
          id: data.id,
        };
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
      console.log(updates);
      await axios.post("http://localhost:3307/api/postschedule", updates);
      setModifiedSchedule([]);
      alert("Données enregistrées avec succès !");
    } catch (error) {
      alert("Erreur lors de l'enregistrement des données :", error);
    }
  };
  

  return (
    <div className="schedule-container">
      <div className="schedule">
        {schedule.map((elt, index) => {
          return (         
            <div key={index} className='day-row'>
              <h3 className='day-name'>{elt.day}</h3>
              <div className='morning-column'>
                <div className='day-input-column'>
                  <span>Matin de</span>
                  <input placeholder={elt.morning_opening} 
                    onBlur={(e) => handleMorningOpeningBlur(e, index)}
                    />
                </div>
                <div className='day-input-column'>
                  <span>à</span>
                  <input placeholder={elt.morning_closing}
                    onBlur={(e) => handleMorningClosingBlur(e, index)}
                  />
                </div>
              </div>
              <div className='afternoon-column'>
                <div className='day-input-column'>
                  <span>Après-midi de</span>
                  <input placeholder={elt.afternoon_opening}
                    onBlur={(e) => handleAfternoonOpeningBlur(e, index)}
                  />
                </div>
                <div className='day-input-column'>
                  <span>à</span>
                  <input placeholder={elt.afternoon_closing} 
                    onBlur={(e) => handleAfternoonClosingBlur(e, index)}
                  />
                </div>   
              </div>
            </div> 
          )
        })}
        <button className='save-btn' onClick={handleSave}>Enregister</button>
      </div>
    </div>
  );
} 

export default AdminSchedule;