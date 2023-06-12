import './Home.scss';
import './Sections/Sections.scss';
import FirstSection from './Sections/Welcome/Welcome';
import SecondSection from './Sections/Presentation/Presentation';
import ThirdSection from './Sections//Sales/Sale';
import FourthSection from './Sections/AllServices/AllServices';
import FifthSection from './Sections/Comms/Comms';

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