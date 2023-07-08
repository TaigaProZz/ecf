import './Sections/Sections.scss';
import WelcomeSection from './Sections/Welcome/Welcome';
// import SecondSection from './Sections/Presentation/Presentation';
import SecondHandSection from './Sections/SecondHand/SecondHand';
import ServiceSection from './Sections/AllServices/AllServices';
import FeedbackSection from './Sections/Feedback/Feedback';

function Home() {
  return (
    <div>
      <WelcomeSection />
      {/* <SecondSection /> */}
      <ServiceSection />
      <SecondHandSection />
      <FeedbackSection />
    </div>
  );
}

export default Home;