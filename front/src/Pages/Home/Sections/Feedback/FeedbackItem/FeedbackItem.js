import './FeedbackItem.scss';
import { AiFillStar } from 'react-icons/ai'

function FeedbackList(props) {
  let rating = [];
  for(let i= 0; i < props.rating; i++) {
    rating.push(<p key={i} className='feedback-star'><AiFillStar size={25}/></p>)
  }

  return (
    <div className="FeedbackList">
      <div className="FeedbackListRating">
        {rating} 
      </div>
      <div className="FeedbackListName">{props.name}</div>
      <div className="FeedbackListText">{props.text}</div>
    </div>
  );
}

export default FeedbackList;