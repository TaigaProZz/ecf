function SectionAllServices() {
  return (
    <section className="lightSection">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h1 className="title">services section</h1>
          </div>
          <div className="col-6">
            <img className="img" src={require('../../../Ressources/cars_atelier.png')} alt="Garage V.Parrot Logo" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionAllServices;