import React from 'react';

import './NavBar.scss';

const imageClick = () => {
  console.log("rr");
} 

function myNav() {
  return (
    <div className='my-nav'>
      <div className='nav-logo'>
        <a href="/">
          <img src='/img/logo.png' onClick={imageClick} width="103" height="47" alt="Garage V.Parrot Logo" />
        </a>
      </div>
        <div className="links">
          <a href="/">Accueil</a>
          <a href="/vente">Ventes</a>
          <a href="/contact">Contact</a>
          <a href="/login">Logo connexion</a>
        </div>       
    </div>
  );
}

export default myNav;