import React from 'react';
import './Footer.scss';

import { BsEnvelopeFill } from 'react-icons/bs';


function myFooter() {
  return ( 
    <div className='myFooter'>
      <div className='horaires'>
        <ul className='horaire'>
          <li className='footerListElement'>lun.: 09:00 - 12:00, 14:00 - 18:20</li>
          <li className='footerListElement'>mar.: 09:00 - 12:00, 14:00 - 18:20</li>
          <li className='footerListElement'>mer.: 09:00 - 12:00, 14:00 - 18:20 </li>
          <li className='footerListElement'>jeu.: 09:00 - 12:00, 14:00 - 18:20</li>
          <li className='footerListElement'>ven.: 09:00 - 12:00, 14:00 - 18:20</li>
          <li className='footerListElement'>sam.: 09:00 - 12:00, 14:00 - 18:20</li>
          <li className='footerListElement'>dim. Fermé</li>
        </ul> 
      </div>
      <div className='navBtn'>
        <div className='btn '>   
          <div className='contactBtn'><BsEnvelopeFill />Nous contacter</div>
        </div>
      </div>
    
      <div className='navLogo'>
        <img className='logoFooter' 
        src='img/logo.png'
        alt="Garage V.Parrot Logo"
        />
      </div>
    </div>
  );
}
export default myFooter;