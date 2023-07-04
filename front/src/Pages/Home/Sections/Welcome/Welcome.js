import { BsEnvelopeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function SectionPresentation() {
  return (
    <div className="welcome-section-container darkHomeSection">
        <section className='left-section'>
          <div className='welcome-title'>
            <h1 className='title'>Garage V.Parrot</h1>
          </div>
          <Link>
            <button className="home-button">
              Nous contacter<br></br> <BsEnvelopeFill />
            </button>
          </Link>
        </section>
        <section className='right-section'>
          <img className="homeImg" src='/img/car_atelier.png' alt="Garage V.Parrot Logo" />
        </section>
      </div>
  );
}

export default SectionPresentation;