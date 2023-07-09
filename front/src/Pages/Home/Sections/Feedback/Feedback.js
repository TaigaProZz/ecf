import { useState, useEffect } from 'react';
import FeedbackList from './FeedbackItem/FeedbackItem';
import CommentBox from './SendFeedback/SendFeedback';
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

  // function to fetch all feedback from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://ecf-node-serv.vercel.app:3307/feedback`);
        const feedbacks = response.data.filter(feedbacks => feedbacks.isVerified === 1);
        setFeedbacks(feedbacks);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="section-feedback-container">
        <div className="header">
          <h2 className="subTitle">Car l'avis de nos clients comptent...</h2>
        </div>
        <div className="boxs">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            navigation = {true}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            effect={'coverflow'}
            coverflowEffect={{
              rotate: 10,
              stretch: 100,
              depth: 50,
              modifier: 1,
              slideShadows: true,
              
            }}

            // breakpoint
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            >
            {feedbacks.map((feedback) => (
              <SwiperSlide key={feedback.id}>
                <FeedbackList name={feedback.name} text={feedback.message} rating={feedback.rating} />
              </SwiperSlide>
            ))}
            
          </Swiper> 
        </div>
        <div className="sendFeedbackList">
          <CommentBox />
        </div>
    </section>
  );
}

export default SectionFeedback;