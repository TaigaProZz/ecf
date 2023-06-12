const style = {
  height: '80vh',
  width: '80vw',
  border : 'solid 1px white',
  borderRadius : '10px',
  backgroundColor: '#3F4458',
  color : 'white',
  marginTop : '5vh',
  }

function Login() {
  return (
    <div>
      <div style= {style}>
        <div className='center' style={{width:'50vh'}}>
          <h1 className='hCenter'>Connexion</h1>
          
          <div className="mb-3" controlId="formBasicEmail">
            <div>Adresse email</div>
            <div type="email" placeholder="Enter email" />
          </div>

          <div className="mb-3" controlId="formBasicPassword">
            <div>Password</div>
            <div type="password" placeholder="Password" />
          </div>

          <div className='hCenter'>
            <div variant="primary" type="submit">
              Se connecter
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Login;