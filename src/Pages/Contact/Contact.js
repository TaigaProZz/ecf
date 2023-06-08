import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const style = {
  height: '80vh',
  border : 'solid 1px white',
  backgroundColor: '#3F4458',
  color : 'white',
  marginTop : '5vh',
}

function Contact() {
  return (
    <div>
      <Container style= {style}>
        <Form className='center' style={{width:'50vh'}}>
          <h1 className='hCenter'>Formulaire de contact</h1>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Entrez votre email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTeDxt">
            <Form.Label>Nom Prénom</Form.Label>
            <Form.Control type="text" placeholder="Entrez votre nom " />
          </Form.Group>

          <div className='hCenter'>
            <Button variant="primary" type="submit">
              Envoyer
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Contact;