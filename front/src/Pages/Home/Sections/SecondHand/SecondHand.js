import { Link } from "react-router-dom";

function SectionsSale() {
  return (
    <section className="darkHomeSection">
      <div className="sectionContainer">
        <div className="left-section center">
          <ul>
            <li>Vente de véhicules d’occasion</li>
            <li>Reprise de vos véhicules</li>
          </ul>
          <Link to="/vente"> 
            <button className="home-button">
              Consulter la liste des véhicules en vente
            </button>
          </Link>
        </div>
        <div className="right-section">
          <img className="homeImg" src='/img/cars_buy.png' alt="Garage V.Parrot Logo" />
        </div>
      </div>
    </section>
  );
}

export default SectionsSale;