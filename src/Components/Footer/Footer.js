import './Footer.scss';
import { useState, useEffect } from 'react';
import { BsEnvelopeFill } from 'react-icons/bs';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function MyFooter() {
  const { pathname } = useLocation();
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

  if(pathname === '/admin') return null;


  return ( 
    <div className='my-footer'>
      <div className='footer-schedule-container'>
        <ul>
          {schedule.map((elt, index) => {
            return <li key={index} className='footer-list-elt'>{elt.day.slice(0,3)}.: {elt.morning_opening} - {elt.morning_closing}, {elt.afternoon_opening} - {elt.afternoon_closing}</li>
          })}
        </ul> 
      </div>
      <div className='footer-btn'>
        <div className='btn '>   
          <div className='contact-btn'><BsEnvelopeFill />Nous contacter</div>
        </div>
      </div>
      <div className='footer-logo'>
        <img className='logo-footer' src='/img/logo.png' alt="Garage V.Parrot Logo"/>
      </div>
    </div>
  );
}
export default MyFooter;