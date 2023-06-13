import { BsEnvelopeFill } from 'react-icons/bs';

function SectionPresentation() {
  return (
      <div className="sectionContainer">
        <div className="darkHomeSection">
          <section className='leftSection center'>
              <h1 className='title'>Garage V.Parrot</h1>
              <div className="btn">
                <a href="/contact">Nous contacter<br></br> <BsEnvelopeFill /></a>
              </div>
          </section>

          <section className='rightSection'>
              <img className="homeImg" src='img/cars_atelier.png' alt="Garage V.Parrot Logo" />
          </section>
        </div>
      </div> 
  );
}

export default SectionPresentation;