import './FeedbackItem.scss';
import { AiFillStar } from 'react-icons/ai'

function FeedbackList(props) {
  let rating = [];
  for(let i= 0; i < props.rating; i++) {
    rating.push(<p key={i} className='feedback-star'><AiFillStar size={25}/></p>)
  }

  return (
    <div className="feedback-list">
      <div className="feedback-list-rating">
        {rating} 
      </div>
      <div className="feedback-list-name">{props.name}</div>
      <div className="feedback-list-text">{props.text}</div>
    </div>
  );
}

export default FeedbackList;