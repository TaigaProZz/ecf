import React from 'react';
import { BiUser } from 'react-icons/bi';
import './NavBar.scss';

function MyNav() {
  return (
    <div className='my-nav'>
      <div className='nav-logo'>
        <a href="/">
          <img src='/img/logo.png' width="103" height="47" alt="Garage V.Parrot Logo" />
        </a>
      </div>
      <div className="links">
        <a href="/">Accueil</a>
        <a href="/vente">Ventes</a>
        <a href="/contact">Contact</a>
      </div>
      <div className="icon">
        <a href="/login"><BiUser size={40}/></a>
      </div>
    </div>
  );
}

export default MyNav;