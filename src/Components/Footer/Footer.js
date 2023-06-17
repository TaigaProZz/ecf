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
        setHoraires(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  console.log(horaires);


  return ( 
    <div className='my-footer'>
      <div className='horaires center'>
        <ul className='horaire'>
          <li className='footer-list-elt'>lun.: 09:00 - 12:00, 14:00 - 18:20</li>
          <li className='footer-list-elt'>mar.: 09:00 - 12:00, 14:00 - 18:20</li>
          <li className='footer-list-elt'>mer.: 09:00 - 12:00, 14:00 - 18:20 </li>
          <li className='footer-list-elt'>jeu.: 09:00 - 12:00, 14:00 - 18:20</li>
          <li className='footer-list-elt'>ven.: 09:00 - 12:00, 14:00 - 18:20</li>
          <li className='footer-list-elt'>sam.: 09:00 - 12:00, 14:00 - 18:20</li>
          <li className='footer-list-elt'>dim. Fermé</li>
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