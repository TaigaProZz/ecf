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
        justifyContent: "center"
      }}
    >
      <MDBContainer className=''>
        <MDBRow>
          <MDBCol size='6' md='4'>
            sm="6" sm="4"
          </MDBCol>
          <MDBCol size='6' md='4'>
            <section className=''>
              <p className='d-flex justify-content-center align-items-center'>
                <Button className='contactBtn center'><BsEnvelopeFill />Nous contacter</Button>
              </p>
            </section>
          </MDBCol>
          <MDBCol size='6' md='4'>
            sm="6" sm="4"
          </MDBCol>
        </MDBRow>
    

      </MDBContainer>
    </MDBFooter>
  );
}
export default myFooter;