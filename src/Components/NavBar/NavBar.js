import './NavBar.scss';
import { BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function MyNav() {
  return (
    <div className='my-nav'>
      <div className='nav-logo'>
        <Link to="/"><img src='/img/logo.png' alt="Garage V.Parrot Logo" /></Link>
      </div>
      <div className="links">
        <Link to="/">Accueil</Link>
        <Link to="/vente">Ventes</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="icon">
        <Link to="/login"><BiUser size={40}/></Link>
      </div>
    </div>
  );
}

export default MyNav;