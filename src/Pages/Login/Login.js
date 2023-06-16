import './Login.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ACCOUNTS from '../../Data/accounts';

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const inputEmail = document.getElementById('login-email-input');
    const inputPassword = document.getElementById('login-password-input');
    const btn = document.querySelector('.home-button');

    const login = () => {
      let email = inputEmail.value;
      let password = inputPassword.value;
      if (email === '' || password === '') {
        console.log('Veuillez remplir tous les champs');
        return;
      } else {
        const account = ACCOUNTS.find(acc => acc.email === email);
        if (account === undefined) {
          console.log('Email incorrect');
          return;
        } else if (account.password !== password) {
          console.log('Mot de passe incorrect');
          return;
        }
      }
      navigate("/admin")
      alert(`${email} est connecté`);

    }

    btn.addEventListener('click', login);
    
    return () => {
      btn.removeEventListener('click', login);    
    }
  }, [navigate]);
  
  return (
    <div className="container center">
      <div className='form'>
        <h1 className='center'>Se connecter</h1>
        <div className='login-email-row'>
          <p className='login-email-text'>Email :</p>
          <div className='login-email-input'>
            <input id='login-email-input'></input>
          </div>
        </div>
        <div className='login-password-row'>
          <p className='login-password-text'>Mot de passe :</p>
          <div className='login-password-input'>
            <input id='login-password-input'></input>
          </div>
        </div>
        <div className='center'>
          <button className='home-button' id="login-btn" type="submit">Se connecter</button>
        </div>
      </div>  
    </div>
    )
}

export default Login;