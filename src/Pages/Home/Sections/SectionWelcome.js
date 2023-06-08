import { Button } from 'react-bootstrap';
import { BsEnvelopeFill } from 'react-icons/bs';

function SectionPresentation() {
  return (
    <section className="firstSection">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h1 className="title">Garage V.Parrot</h1>
            <Button className='contactBtn'><BsEnvelopeFill />Nous contacter</Button>
          </div>
          <div className="col-6" style={{display: 'flex', justifyContent: 'center'}}>
            <img className="img" src={require('../../../Ressources/cars_atelier.png')} alt="Garage V.Parrot Logo" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionPresentation;