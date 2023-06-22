import './AdminSchedule.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminSchedule () {
  const [schedule, setSchedule] = useState(null);

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
                <input placeholder={elt.morning_opening}></input>
              </div>
              <div className='day-input-column'>
                <span>à</span>
                <input placeholder={elt.morning_closing}></input>
              </div>
            </div>
            <div className='afternoon-column'>
              <div className='day-input-column'>
                <span>Après-midi de</span>
                <input placeholder={elt.afternoon_opening}></input>
              </div>
              <div className='day-input-column'>
                <span>à</span>
                <input placeholder={elt.afternoon_closing}></input>
              </div>   
            </div>
          </div> 
        )
      })}
      <button className='save-btn'>Enregister</button>
    </div>
  </div>
);
} 

export default AdminSchedule;