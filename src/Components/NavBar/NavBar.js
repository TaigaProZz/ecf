import axios from 'axios';
import './NavBar.scss';
import { BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function MyNav({ user, setUser }) {

  const logout = async () => {
    try {
      const response = await axios.get("http://localhost:3307/api/logout");
      if (response.status === 200) {
        alert("Vous êtes déconnecté");
        setUser({});
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='my-nav'>
      <div className='nav-logo'>
        <Link to="/"><img src='/img/logo.png' alt="Garage V.Parrot Logo" /></Link>
      </div>
      <div className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/vente">Ventes</Link>
        <Link to="/contact">Contact</Link>
        {user.name && <Link to="/admin">Admin</Link>}
      </div>
      <div className="nav-icon">
        
        {user.name && <Link onClick={logout}>Déconnexion</Link>}
        {!user.name && <Link to="/login"><BiUser size={40}/></Link>}
        {user.name && <p>{user.name}</p>}
        
      </div>
    </div>
  );
}

export default MyNav;