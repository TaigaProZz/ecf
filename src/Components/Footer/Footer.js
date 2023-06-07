import React from 'react';
import { Button } from 'react-bootstrap';
import './Footer.scss';
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

import { BsEnvelopeFill } from 'react-icons/bs';


function myFooter() {
  return ( 
    <MDBFooter className='text-center text-white fixed-bottom' 
      style={{ 
        backgroundColor: '#293045',
        height:'200px',
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between'
      }}
    >
      <MDBContainer>
        <MDBRow>
          <MDBCol size='6' md='4' className='d-flex my-auto'>
            <ul className='horaire'>
              <li className='footerListElement'>lun.: 09:00 - 12:00, 14:00 - 18:20</li>
              <li className='footerListElement'>mar.: 09:00 - 12:00, 14:00 - 18:20</li>
              <li className='footerListElement'>mer.: 09:00 - 12:00, 14:00 - 18:20 </li>
              <li className='footerListElement'>jeu.: 09:00 - 12:00, 14:00 - 18:20</li>
              <li className='footerListElement'>ven.: 09:00 - 12:00, 14:00 - 18:20</li>
              <li className='footerListElement'>sam.: 09:00 - 12:00, 14:00 - 18:20</li>
              <li className='footerListElement'>dim. Fermé</li>
            </ul> 
          </MDBCol>
          <MDBCol size='6' md='4' className='d-flex my-auto justify-content-center'>   
              <Button className='contactBtn center'><BsEnvelopeFill />Nous contacter</Button>
          </MDBCol>
          <MDBCol size='6' md='4' className='d-flex my-auto justify-content-center'>
             <img className='logoFooter' 
             src={require('../../Ressources/logo.png')}
             alt="Garage V.Parrot Logo"
            />
          </MDBCol>
        </MDBRow>
    

      </MDBContainer>
    </MDBFooter>
  );
}
export default myFooter;