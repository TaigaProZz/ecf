function Login() {
  return (
    <div className="container center">
    <div className='form'>
      <h1 className='center'>Se connecter</h1>
      <div className='email-row row'>
        <p>Email :</p>
        <input id='email-input'></input>
      </div>
      <div className='password-row row'>
        <p>Mot de passe :</p>
        <input id='name-input' className='center'></input>
      </div>
      <div className='center'>
        <div className='btn' type="submit">Se connecter</div>
      </div>
    </div>  
  </div>
    )
}

export default Login;