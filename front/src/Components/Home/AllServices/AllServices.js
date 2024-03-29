import { useEffect, useState } from "react";
import axios from "axios";


function SectionAllServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/service`);
        const list = response.data;
        setServices(list);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className='section-container-v1 light-section'>
      <div className="left-section-v1">
        <img className="homeImg" src='/img/car_repair.webp' alt="Garage V.Parrot Logo" />

      </div>
      <div className="right-section-v1">  
      <h1 className="h2-service">Nos services</h1>
        <div className='service-list'>
            <ul className="ul-service">
              { services.map((elt, index) => { 
                return <li className="li-service" key={index}>{elt.services}</li>
              })}
            </ul>
          </div>      
      </div> 
    </section>
  );
}

export default SectionAllServices;