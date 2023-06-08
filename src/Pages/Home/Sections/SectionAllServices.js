import { Container, Row, Col } from 'react-bootstrap';

function SectionAllServices() {
  return (
    <section className="lightHomeSection">
      <Container>
        <Row>
          <Col>
            <img className="img" src={require('../../../Ressources/cars_atelier.png')} alt="Garage V.Parrot Logo" />
          </Col>
          <Col>
            <div className='serviceList'>
              <ul>
                <li>Réparation Carrosserie</li>
                <li>Réparation voiture</li>
                <li>Contrôle Technique</li>
                <li>Contrôle Technique</li>
                <li>Contrôle Technique</li>
                <li>Entretien et remise en route</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SectionAllServices;