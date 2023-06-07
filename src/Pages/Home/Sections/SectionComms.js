import { Container, Row, Col } from 'react-bootstrap';
import CommsBox from '../../../Components/Section/Comms/CommsBox/CommsBox';
import CommentBox from '../../../Components/Section/Comms/SendComms/SendComms';

function SectionComms() {
  return (
    <div className='commsSection flex-wrap'>
      <section className="mainSection">
        <Container>
          <Row>
            <Col>
              <h1 className="subTitle center">Car l'avis de nos clients comptent...</h1>
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
              <h1 className="subTitle center"><CommentBox /> </h1>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default SectionComms;