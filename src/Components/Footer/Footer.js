import React from 'react';
import './Footer.scss';

import { BsEnvelopeFill } from 'react-icons/bs';


function myFooter() {
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
export default myFooter;