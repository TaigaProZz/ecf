import FeedbackList from './FeedbackItem/FeedbackItem';
import CommentBox from './SendFeedback/SendFeedback';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Feedback.scss'

function SectionFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  // function to fetch all feedback from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3307/feedback');
        const feedbacks = response.data.filter(feedbacks => feedbacks.isVerified === 1);
        setFeedbacks(feedbacks);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="sectionFeedbackContainer">
        <div className="header">
          <h2 className="subTitle">Car l'avis de nos clients comptent...</h2>
        </div>
        <div className="boxs">
          <Carousel
            showThumbs={false}
            infiniteLoop={true}
            centerMode={true}
            centerSlidePercentage={33.33}
            showStatus={false}
            swipeable={false}
            interval={2000}
          >
            {feedbacks.map((feedback) => (
              <div key={feedback.id}>
                <FeedbackList name={feedback.name} text={feedback.message} rating={feedback.rating} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="sendFeedbackList">
          <CommentBox />
        </div>
    </section>
  );
}

export default SectionFeedback;