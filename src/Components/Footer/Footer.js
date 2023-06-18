import './Footer.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BsEnvelopeFill } from 'react-icons/bs';

function MyFooter() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3307/api/schedule');
        const list = response.data;
        setSchedule(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return ( 
    <div className='my-footer'>
      <div className='schedule-container center'>
        <ul>
          {schedule.map((elt, index) => {
            return <li key={index} className='footer-list-elt'>{elt.day.slice(0,3)}.: {elt.morning_opening} - {elt.morning_closing}, {elt.afternoon_opening} - {elt.afternoon_closing}</li>
          })}
        </ul> 
      </div>
      <div className='nav-btn center'>
        <div className='btn '>   
          <div className='contact-btn'><BsEnvelopeFill />Nous contacter</div>
        </div>
      </div>
      <div className='nav-logo center'>
        <img className='logo-footer' 
        src='/img/logo.png'
        alt="Garage V.Parrot Logo"
        />
      </div>
    </div>
  );
}
export default MyFooter;