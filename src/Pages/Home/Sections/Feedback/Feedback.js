import FeedbackList from './FeedbackList/FeedbackItem';
import CommentBox from './SendFeedback/SendFeedback';
import './Feedback.scss'
import { useState, useEffect } from 'react';
import axios from 'axios';

function SectionFeedback() {

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3307/api/feedbacks')
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
      <section className="darkHomeSection">
        <div className='sectionFeedbackContainer'>
          <div className="header">
            <h1 className="subTitle">Car l'avis de nos clients comptent...</h1>
          </div>
          <div className="boxs">
            {feedbacks.map((feedback) => {
              return (
                <FeedbackList key={feedback.id} name={feedback.name} text={feedback.message} rating={feedback.rating} />
              );
            })}
          </div>
          <div className="sendFeedbackList">
            <CommentBox />
          </div>
        </div>
      </section>
  );
}

export default SectionFeedback;