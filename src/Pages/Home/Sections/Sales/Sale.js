function SectionsSale() {
  return (
    <section className="darkHomeSection">
      <div className="sectionContainer">
        <div className="leftSection center">
          <ul>
            <li>Vente de véhicules d’occasion</li>
            <li>Reprise de vos véhicules</li>
          </ul>
          <div className="btn">
            <a href="/ventes">Consulter la liste des véhicules en vente</a>
          </div>
        </div>
        <div className="rightSection">
          <img className="homeImg" src='img/cars_buy.jpg' alt="Garage V.Parrot Logo" />
          
        </div>
      </div>
    </section>
  );
}

export default SectionsSale;