import Button from 'react-bootstrap/Button';

function SectionIntro() {

  return (
    <section className="lightSection">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <img className='img' src={require('../../../Ressources/car_repair.jpg')} alt="reparation de voiture" />
          </div>
          <div className="col-6">
            <ul>
              <li>Réparation Carrosserie</li>
              <li>Réparation voiture</li>
              <li>Contrôle Technique</li>
              <li>Entretien et remise en route</li>
            </ul>
            <Button>Voir tous les services</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionIntro;