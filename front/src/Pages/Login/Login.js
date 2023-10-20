import './Login.scss';
import EmptyFields from '../../Components/Popup/EmptyFields';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setUser }) {
  const navigate = useNavigate();
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);

  // check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/user`, { withCredentials: true });
        if (response.status === 200) {
          setUser(response.data.data);
          navigate("/admin");
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    checkUser();
  }, [navigate, setUser]);

 
  const login = async () => {
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    const user = { email, password };
    if (email.trim() === '' || password.trim() === '') {
      toast.warn(<EmptyFields message='Veuillez remplir tous les champs' />);
      return;
    } else {
        try {
          await toast.promise(
            axios.post(`${process.env.REACT_APP_API}/auth`, user),
             {
              pending: 'Connexion en cours...',
              success: {
                render({ data }) {
                  setUser(data.data)
                  navigate("/admin");
                  return `${email}, vous êtes connecté`;
                }
              },
              error: {
                render(error) {
                  console.log(error);
                  return 'Erreur lors de la connexion. Veuillez vérifier vos informations saisies et réessayer';
                }
              }
            }
          );
        } catch (error) {
          console.log('Erreur lors de la connexion', error);
        }
      }
  }

  return (
    <div className='login-container'>
    <div className='login-header'>
      <img src='img/logo.png' alt='logo figsale'></img>
    </div>
    <form className='login-form-container'>
      <div className='login-form'>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" ref={inputEmail} placeholder='email@example.com' maxLength={32} />

        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" ref={inputPassword} placeholder='Saisissez votre mot de passe' />
        <div className='login-button-container'>
          <button type="submit" onClick={login}>Se connecter</button> 
        </div>
      </div>
    </form>
  </div>
  )
}

export default Login;