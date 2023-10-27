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
  }, [setUser]);

 
  const login = async () => {
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    const user = { email, password };

    // check if inputs are empty
    if (email.trim() === '' || password.trim() === '') {
      toast.warn(<EmptyFields message='Veuillez remplir tous les champs' />);
      return;
    }
    // check if email is valid
    if (!validateEmail(email)) {
      toast.error(<EmptyFields message="L'adresse e-mail n'est pas valide" />);
      return;
    }

    try {
      await ToastLogin(user, email);
    } catch (error) {
      console.log('Erreur lors de la connexion', error);
    }
  }

  return (
    <div className='login-container'>
    <div className='login-header'>
      <img src='img/logo.png' alt='logo figsale'></img>
    </div>
    <form className='login-form-container' onSubmit={login}>
      <div className='login-form'>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" ref={inputEmail} placeholder='email@example.com' maxLength={32} autoComplete='email' required/>

        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" ref={inputPassword} placeholder='Saisissez votre mot de passe' autoComplete='current-password' required/>
        <div className='login-button-container'>
          <button type="submit">Se connecter</button> 
        </div>
      </div>
    </form>
  </div>
  )

  async function ToastLogin (user, email) {
    toast.promise(
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
  }
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
  return regex.test(email);
}

export default Login;