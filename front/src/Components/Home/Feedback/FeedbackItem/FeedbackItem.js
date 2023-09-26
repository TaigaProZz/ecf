import './FeedbackItem.scss';
import { AiFillStar } from 'react-icons/ai'

function FeedbackItem(props) {
  let rating = [];
  for(let i= 0; i < props.rating; i++) {
    rating.push(<p key={i}><AiFillStar size={25}/></p>)
  }

  return (
    <div className="feedback-item">
      <div className="feedback-item-rating">
        {rating} 
      </div>
      <div className="feedback-item-name">{props.name}</div>
      <div className="feedback-item-text">{props.text}</div>
    </div>
  );
}

export default FeedbackItem;