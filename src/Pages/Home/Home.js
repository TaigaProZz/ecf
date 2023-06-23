import './Sections/Sections.scss';
import FirstSection from './Sections/Welcome/Welcome';
import SecondSection from './Sections/Presentation/Presentation';
import ThirdSection from './Sections/SecondHand/SecondHand';
import FourthSection from './Sections/AllServices/AllServices';
import FifthSection from './Sections/Feedback/Feedback';

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