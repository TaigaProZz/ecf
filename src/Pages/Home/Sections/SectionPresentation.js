import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function SectionIntro() {

  return (
    <section className="lightHomeSection">
      <Container>
        <Row>
          <Col>
            <img className='img' src={require('../../../Ressources/car_repair.jpg')} alt="reparation de voiture" />
          </Col>
          <Col>
            <ul>
              <li>Réparation Carrosserie</li>
              <li>Réparation voiture</li>
              <li>Contrôle Technique</li>
              <li>Entretien et remise en route</li>
            </ul>
            <Button>Voir tous les services</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SectionIntro;