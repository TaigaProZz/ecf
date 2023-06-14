import './Login.scss';
function Login() {
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
          <button className='btn' type="submit">Se connecter</button>
        </div>
      </div>  
    </div>
    )
}

export default Login;