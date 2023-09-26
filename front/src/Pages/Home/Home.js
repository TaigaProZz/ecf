import '../../Components/Home/Sections.scss';
import WelcomeSection from '../../Components/Home/Welcome/Welcome';
import SecondHandSection from '../../Components/Home/SecondHand/SecondHand';
import ServiceSection from '../../Components/Home/AllServices/AllServices';
import FeedbackSection from '../../Components/Home/Feedback/Feedback';

function Home() {
  return (
    <div>
      <WelcomeSection />
      <ServiceSection />
      <SecondHandSection />
      <FeedbackSection />
    </div>
  );
}

export default Home;