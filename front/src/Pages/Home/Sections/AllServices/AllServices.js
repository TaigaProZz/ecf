import { useEffect, useState } from "react";
import axios from "axios";

function SectionAllServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3307/service");
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
        <img className="homeImg" src='/img/car_atelier.png' alt="Garage V.Parrot Logo" />

      </div>
      <div className="right-section-v1">  
        <div className='service-list'>
            <ul>
              { services.map((elt, index) => { 
                return <li key={index}>{elt.services}</li>
              })}
            </ul>
          </div>      
      </div> 
    </section>
  );
}

export default SectionAllServices;