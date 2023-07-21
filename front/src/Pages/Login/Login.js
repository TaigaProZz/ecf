import './Login.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setUser }) {
  const navigate = useNavigate();
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  // set with credentials to true
  axios.defaults.withCredentials = true;
 
  const login = async () => {
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    const user = { email, password };
    if (email === '' || password === '') {
      toast.warn('Veuillez remplir tous les champs');
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
                render({ data }) {
                  return `Veuillez vérifier vos informations saisies et réssayer`;
                }
              }
            }
          );
            
        } catch (error) {
          toast.error('Erreur lors de la connexion', error);
        }
      }
  }

  return (
    <div className="login-container">
      <div className='login-form'>
        <h1 className='form-title'>Se connecter</h1>
        <div className='login-email-row'>
          <label className='login-email-text'>Email :</label>
          <div className='login-email-input'>
            <input ref={inputEmail} type='email' id='login-email-input'></input>
          </div>
        </div>
        <div className='login-password-row'>
          <label className='login-password-text'>Mot de passe :</label>
          <div className='login-password-input'>
            <input ref={inputPassword} type='password' id='login-password-input'></input>
          </div>
        </div>
        <div className='center'>
        <button className='home-button' id="login-btn" type="submit" onClick={login}>Connexion</button>
        </div>
      </div>  
    </div>
  )
}

export default Login;