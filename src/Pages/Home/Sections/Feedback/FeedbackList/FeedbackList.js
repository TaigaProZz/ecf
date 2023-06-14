import React from 'react';
import './FeedbackList.scss';
import { AiFillStar } from 'react-icons/ai'

function FeedbackList(props) {
  let grade = [];
  for(let i= 0; i < props.grade; i++) {
    grade.push(<p className='star'><AiFillStar /></p>)
  }

  return (
    <div className="FeedbackList">
      <div className="FeedbackListGrade">
        {grade} 
      </div>
      <div className="FeedbackListName">{props.name}</div>
      <div className="FeedbackListText">{props.text}</div>
    </div>
  );
}

export default FeedbackList;