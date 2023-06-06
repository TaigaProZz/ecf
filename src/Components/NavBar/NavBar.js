import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';

const navColor = {
  backgroundColor: '#293045',
  color: '#fff'
}

function myNav() {
  return (
    <Navbar className={navColor} bg="dark" variant="dark">
    <Navbar.Brand className='home' href="#home">Mon Logo</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mx-auto">
        <Nav.Link href="#home">Accueil</Nav.Link>
        <Nav.Link href="#about">Ventes</Nav.Link>
        <Nav.Link href="#services">Contact</Nav.Link>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Link href="#home">Logo connexion</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
}

export default myNav;