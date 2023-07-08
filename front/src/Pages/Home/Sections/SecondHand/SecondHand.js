import { Link } from "react-router-dom";

function SectionsSale() {
  return (
    <section className="section-container-v2">
        <div className="left-section-v2">
          <ul>
            <li>Vente de véhicules d’occasion</li>
            <li>Reprise de vos véhicules</li>
          </ul>
          <Link to="/vente"> 
            <button className="home-button home-sch-btn">
              <p>Consulter la liste des véhicules en vente</p>
            </button>
          </Link>
        </div>
        <div className="right-section-v2">
          <img className="homeImg" src='/img/cars_buy.png' alt="Garage V.Parrot Logo" />
        </div>
   
    </section>
  );
}

export default SectionsSale;