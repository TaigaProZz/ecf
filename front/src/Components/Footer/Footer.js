import './Footer.scss';
import { useState, useEffect } from 'react';
import { BsEnvelopeFill } from 'react-icons/bs';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
require('dotenv').config();

function MyFooter() {
  const { pathname } = useLocation();
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`ecf-node-serverr.vercel.app:${process.env.REACT_APP_API_PORT}/schedule`);
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
            // display " Fermé " if morngin opening and closing are equal to 0 and display the afternoon if afternoon opening and closing are equal to 0
            if(elt.morning_opening == 0 && elt.morning_closing == 0) return <li key={index} className='footer-list-elt'>{elt.day.slice(0,3)}.: Fermé, {elt.afternoon_opening} - {elt.afternoon_closing}</li>
            return <li key={index} className='footer-list-elt'>{elt.day.slice(0,3)}.: {elt.morning_opening} - {elt.morning_closing}, {elt.afternoon_opening} - {elt.afternoon_closing}</li>
          })}
        </ul> 
      </div>
      <div className='right-side-footer'>
        <div className='footer-btn'>
          <div className='btn'>
            <Link to='/contact'>   
              <button className='footer-contact-btn'>
                <BsEnvelopeFill />
                <span className='contact-btn-text'>Contact</span>
              </button>
            </Link>
          </div>
        </div>
        <div className='footer-logo'>
          <img className='logo-footer' src='/img/logo.png' alt="Garage V.Parrot Logo"/>
          <p>Trouvez nous au : 10 rue xxx 90000</p>
        </div>
      </div>  
    </div>
  );
}
export default MyFooter;