import { BsEnvelopeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './Welcome.scss';

function SectionPresentation() {
  return (
    <div className="welcome-section-container">
        <section className='welcome-left-section'>
          <div className='welcome-title'>
            <h1 className='title'>Garage V.Parrot</h1>
          </div>
          <Link to= "/contact">
            <button className="home-button">
              Nous contacter<br></br> <BsEnvelopeFill />
            </button>
          </Link>
        </section>
        <section className='welcome-right-section'>
          <img className="homeImg" src='/img/car_atelier.webp' alt="Garage V.Parrot Logo" />
        </section>
      </div>
  );
}

export default SectionPresentation;