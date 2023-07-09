import './Login.scss';
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
    if (email === '' || password === '') {
      alert('Veuillez remplir tous les champs');
      return;
    } else {
        try {
          const response = await axios.post(`https://ecf-node-serv.vercel.app/auth`,  {
            email: email,
            password: password  
          });
          if (response.status === 200) {
            alert(`${email} est connecté`);
            setUser(response.data)
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