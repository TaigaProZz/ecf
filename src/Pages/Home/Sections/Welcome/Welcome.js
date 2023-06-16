import { BsEnvelopeFill } from 'react-icons/bs';
import './Welcome'

function SectionPresentation() {
  return (
    <div className="sectionContainer">
      <div className="darkHomeSection">
        <section className='leftSection center'>
          <h1 className='title'>Garage V.Parrot</h1>
          <button className="home-button">
            <a href="/contact">Nous contacter<br></br> <BsEnvelopeFill /></a>
          </button>
        </section>
        <section className='rightSection'>
          <img className="homeImg" src='/img/car_atelier.png' alt="Garage V.Parrot Logo" />
        </section>
      </div>
    </div> 
  );
}

export default SectionPresentation;