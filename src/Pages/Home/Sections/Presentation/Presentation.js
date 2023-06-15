function SectionIntro() {
  return (
    <div className="lightSection">
      <section className="sectionContainer">
          <div className="leftSection">
            <img className='homeImg' src='/img/car_repair.jpg' alt="reparation de voiture" />
          </div>
          <div className="rightSection center">
            <ul>
            <li>Réparation Carrosserie</li>
            <li>Réparation voiture</li>
            <li>Contrôle Technique</li>
            <li>Entretien et remise en route</li>
          </ul>
          <button className="home-button">
            <a href="/ventes">Voir tous les services</a>
          </button>
        </div>
      </section>
    </div>

  );
}

export default SectionIntro;