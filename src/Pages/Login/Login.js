import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

const style = {
  height: '80vh',
  width: '80vw',
  border : 'solid 1px white',
  backgroundColor: '#3F4458',
  color : 'white',
  marginTop : '5vh',
  }

function Login() {
  return (
    <div>
      <Container style= {style}>
        <Form className='center' style={{width:'50vh'}}>
          <h1 className='hCenter'>Connexion</h1>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Adresse email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <div className='hCenter'>
            <Button variant="primary" type="submit">
              Se connecter
            </Button>
          </div>
        </Form>
      </Container>
    </div>
    )
}

export default Login;