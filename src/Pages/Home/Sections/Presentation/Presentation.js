import { Link } from "react-router-dom";

function SectionIntro() {
  return (
    <div className="lightSection">
      <section className="sectionContainer">
          <div className="leftSection">
            <img className='homeImg' src='/img/car_repair.png' alt="reparation de voiture" />
          </div>
          <div className="rightSection center">
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
    </div>

  );
}

export default SectionIntro;