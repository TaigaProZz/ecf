import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './NavBar.scss';
import { BiUser } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

function MyNav({ user, setUser }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  if (user === null) setUser({});

  const logout = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/auth`, { withCredentials: true });
      if (response.status === 200) {
        setUser([]);
        toast.info("Vous êtes déconnecté");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  }
  
  const closeMenu = () => {
    setMenuOpen(false);
  }

  return (
    <div id="outer-container">
      <Menu 
        className='burger' 
        pageWrapId={ "page-wrap" } 
        outerContainerId={ "outer-container" } 
        isOpen={ menuOpen }
        onStateChange={(state) => handleStateChange(state)}
      > 
        <Link to="/" className='menu-item' onClick={closeMenu}>Accueil</Link>
        <Link to="/vente" className='menu-item' onClick={closeMenu}>Ventes</Link>
        <Link to="/contact" className='menu-item' onClick={closeMenu}>Contact</Link>
        {user.name && <Link to="/admin" className='menu-item' onClick={closeMenu}>Admin</Link>}
        {user.name && <Link onClick={() => {logout(); closeMenu();}} className='menu-item'>Déconnexion</Link>}
        {!user.name && <Link to="/login" className='menu-item' onClick={closeMenu}>Connexion</Link>}
        {user.name && <p>{user.name}, vous êtes connecté(e)</p>}
      </Menu>

      <main id="page-wrap">
        <div className='my-nav'>      
          <div className='nav-logo'>
            <Link to="/"><img src='/img/logo.webp' alt="Garage V.Parrot Logo" /></Link>
          </div>
          <div className="nav-links">
            <Link to="/">Accueil</Link>
            <Link to="/vente">Ventes</Link>
            <Link to="/contact">Contact</Link>
            {user.name && <Link to="/admin">Admin</Link>}
          </div>
          <div className="nav-user" >
            {user.name && <Link onClick={logout}>Déconnexion</Link>}
            {!user.name && <Link to="/login" data-qa='user-btn'><BiUser size={40}/></Link>}
            {user.name && <p>{user.name}, vous êtes connecté(e)</p>} 
          </div>
        </div>
      </main>
   
    </div>
  );
}

export default MyNav;