import './Login.scss';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  // set with credentials to true
  axios.defaults.withCredentials = true;
  

  const login = async () => {
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    if (email === '' || password === '') {
      console.log('Veuillez remplir tous les champs');
      return;
    } else {
        try {
          const response = await axios.post("http://localhost:3307/api/login", 
          {
            params: {
              email: email,
              password: password
            }
          });
          if (response.status === 200) {
            alert(`${email} est connecté`);
            navigate("/admin");
          } else {
            alert("Veuillez vérifier vos informations saisies et réssayer")
          }
        } catch (error) {
          console.log(error);
        }
      }
  }

  return (
    <div className="login-container">
      <div className='form'>
        <h1 className='center'>Se connecter</h1>
        <div className='login-email-row'>
          <p className='login-email-text'>Email :</p>
          <div className='login-email-input'>
            <input ref={inputEmail} id='login-email-input'></input>
          </div>
        </div>
        <div className='login-password-row'>
          <p className='login-password-text'>Mot de passe :</p>
          <div className='login-password-input'>
            <input ref={inputPassword} id='login-password-input'></input>
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