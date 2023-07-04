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
    <div className="lightSection">
      <section className='sectionContainer'>
        <div className="leftSection">
          <div className='serviceList'>
            <ul>
              { services.map((elt, index) => { 
                return <li key={index}>{elt.services}</li>
              })}
            </ul>
          </div>
        </div>
        <div className="rightSection">        
          <img className="homeImg" src='/img/car_atelier.png' alt="Garage V.Parrot Logo" />
        </div> 
      </section>
    </div>
  );
}

export default SectionAllServices;