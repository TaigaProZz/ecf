import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SectionIntro() {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3307/service');
      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);


  return (
      <section className="section-container-v1 light-section">
          <div className="left-section-v1">
            <img className='homeImg' src='/img/car_repair.png' alt="reparation de voiture" />
          </div>
          <div className="right-section-v1">
            <ul>
              { services.slice(0, 4).map((service) => {
                  return <li key={service.id}>{service.services}</li>
              })}
              <li>...</li>
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