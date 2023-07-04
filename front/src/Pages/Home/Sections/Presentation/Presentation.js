import { Link } from "react-router-dom";

function SectionIntro() {
  return (
      <section className="section-container-v1 light-section">
          <div className="left-section-v1">
            <img className='homeImg' src='/img/car_repair.png' alt="reparation de voiture" />
          </div>
          <div className="right-section-v1">
            <ul>
              <li>Réparation Carrosserie</li>
              <li>Réparation voiture</li>
              <li>Contrôle Technique</li>
              <li>Entretien et remise en route</li>
          </ul>
          <Link to="/ventes">
            <button className="home-button">
              Voir tous les services
            </button>
          </Link>
        </div>
      </section>
  );
}

export default SectionIntro;