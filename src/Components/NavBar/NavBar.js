import React from 'react';

import './NavBar.scss';

const imageClick = () => {
  console.log("rr");
} 

function myNav() {
  return (
    <div className='myNav'>
      <div className='navLogo'>
        <a href="/">
        <img src='img/logo.png' onClick={imageClick} href="/" width="103" height="47" className="d-inline-block align-top" alt="Garage V.Parrot Logo" />
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