import Nav from 'react-bootstrap/Nav';
import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import './NavBar.scss';


function myNav() {
  return (
  <Navbar className='myNav' variant="dark">
    <Navbar.Brand className='logoNavbar' href="/home">
       <img
       src={require('../../Ressources/logo.png')}
       width="103"
       height="47"
       className="d-inline-block align-top"
       alt="Garage V.Parrot Logo"
     />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="links mx-auto">
        <Nav.Link href="/">Accueil</Nav.Link>
        <Nav.Link href="/vente">Ventes</Nav.Link>
        <Nav.Link href="/contact">Contact</Nav.Link>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Link href="#home">Logo connexion</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
}

export default myNav;