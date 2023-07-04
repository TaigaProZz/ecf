import axios from 'axios';
import './NavBar.scss';
import { BiUser } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

function MyNav({ user, setUser }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.get("http://localhost:3307/auth");
      if (response.status === 200) {
        setUser({});
        alert("Vous êtes déconnecté");
        navigate("/");
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
      <div className="nav-user">
        {user.name && <Link onClick={logout}>Déconnexion</Link>}
        {!user.name && <Link to="/login"><BiUser size={40}/></Link>}
        {user.name && <p>{user.name}, vous êtes connecté(e)</p>}
        
      </div>
    </div>
  );
}

export default MyNav;