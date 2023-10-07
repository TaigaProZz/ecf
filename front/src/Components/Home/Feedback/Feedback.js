import { useState, useEffect } from 'react';
import FeedbackItem from './FeedbackItem/FeedbackItem';
import FeedbackSender from './FeedbackSender/FeedbackSender';
import axios from 'axios';
import './Feedback.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow} from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/css/effect-coverflow';

function SectionFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  // fetch all feedback from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/feedback/verified`);
        setFeedbacks(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="section-feedback-container">
        <div className="header">
          <h2 className="subTitle">Car l'avis de nos clients compte...</h2>
        </div>
        <div className="boxs">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            navigation = {true}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              700: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              968: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {feedbacks.map((feedback) => (
              <SwiperSlide key={feedback.id}>
                <FeedbackItem name={feedback.name} text={feedback.message} rating={feedback.rating} />
              </SwiperSlide>
            ))}
          </Swiper> 
        </div>
        <div className="send-feedback-list">
          <FeedbackSender />
        </div>
    </section>
  );
}

export default SectionFeedback;