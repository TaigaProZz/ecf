import './Footer.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BsEnvelopeFill } from 'react-icons/bs';

function MyFooter() {
  const [horaires, setHoraires] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3307/api/horaires');
        const list = response.data;
        console.log(list);
        setHoraires(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return ( 
    <div className='my-footer'>
      <div className='horaires center'>
        <ul className='horaire'>
          {horaires.map((horaire) => {
            console.log(horaire);
            return <li className='footer-list-elt'>{horaire.day.slice(0,3)}.: {horaire.morning_opening} - {horaire.morning_closing}, {horaire.afternoon_opening} - {horaire.afternoon_closing}</li>
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