import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.scss';
import './Sections/Sections.scss';
import FirstSection from './Sections/SectionWelcome';
import SecondSection from './Sections/SectionPresentation';
import ThirdSection from './Sections/SectionSale';
import FourthSection from './Sections/SectionAllServices';
import FifthSection from './Sections/SectionComms';

function Home() {
  return (
    <div>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
    </div>
  );
}

export default Home;