import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


function SectionsSale() {
  return (
    <section className="darkHomeSection">
      <Container>
        <Row>
          <Col>
            <ul>
              <li>Vente de véhicules d\’occasion</li>
              <li>Reprise de vos véhicules</li>
              
            </ul>
            <Button>Consulter la liste des véhicules en vente</Button>
          </Col>
          <Col>
            <img className="img" src={require('../../../Ressources/cars_buy.jpg')} alt="Garage V.Parrot Logo" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SectionsSale;