import FeedbackList from './FeedbackItem/FeedbackItem';
import CommentBox from './SendFeedback/SendFeedback';
import './Feedback.scss'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


function SectionFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  // function to fetch all feedback from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3307/api/getfeedback');
        const feedbacks = response.data.filter(feedbacks => feedbacks.isVerified === 1);
        setFeedbacks(feedbacks);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
      <section className="darkHomeSection">
        <div className='sectionFeedbackContainer'>
          <div className="header">
            <h1 className="subTitle">Car l'avis de nos clients comptent...</h1>
          </div>
          <div className="boxs">
          <Carousel
            showThumbs={false}
            infiniteLoop={true}
            centerMode={true}
            centerSlidePercentage={33.33}
            showStatus={false}
            swipeable={true}
            autoPlay={true}
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
        </div>
      </section>
  );
}

export default SectionFeedback;