import { useState } from "react";
import { SERVICES } from "../../../../Data/services";

function SectionAllServices() {
  const [services] = useState(SERVICES);
  const listServices = services.map((elt, index) => {
    return <li key={index}>{elt.service}</li>
  });
  
  return (
    <div className="lightSection">
      <section className='sectionContainer'>
        <div className="leftSection">
          <div className='serviceList'>
            <ul>
              {listServices}
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