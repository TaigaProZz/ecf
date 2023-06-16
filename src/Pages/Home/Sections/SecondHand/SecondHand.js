function SectionsSale() {
  return (
    <section className="darkHomeSection">
      <div className="sectionContainer">
        <div className="leftSection center">
          <ul>
            <li>Vente de véhicules d’occasion</li>
            <li>Reprise de vos véhicules</li>
          </ul>
          <button className="home-button">
            <a href="/ventes">Consulter la liste des véhicules en vente</a>
          </button>
        </div>
        <div className="rightSection">
          <img className="homeImg" src='/img/cars_buy.png' alt="Garage V.Parrot Logo" />
        </div>
      </div>
    </section>
  );
}

export default SectionsSale;