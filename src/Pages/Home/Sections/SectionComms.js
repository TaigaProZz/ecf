import { Container, Row, Col } from 'react-bootstrap';
import CommsBox from '../../../Components/HomeSection/Comms/CommsBox/CommsBox';
import CommentBox from '../../../Components/HomeSection/Comms/SendComms/SendComms';

function SectionComms() {
  return (
      <section className="darkHomeSection">
        <Container>
          <Row>
            <Col>
              <h1 className="subTitle">Car l'avis de nos clients comptent...</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <CommsBox title="Je suis un titre" text="Je suis le commentaire" />
            </Col>
            <Col>
              <CommsBox title="Je suis un titre" text="Je suis le commentaire" />
            </Col>
            <Col>
              <CommsBox title="Je suis un titre" text="Je suis le commentaire" />
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className="subTitle"><CommentBox /> </h1>
            </Col>
          </Row>
        </Container>
      </section>
  );
}

export default SectionComms;