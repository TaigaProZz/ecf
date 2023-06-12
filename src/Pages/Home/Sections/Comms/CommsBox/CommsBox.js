// print a box to display the user's comments
import React from 'react';
import './CommsBox.scss';

function CommsBox(props) {
  return (
    <div className="commsBox">
      <div className="commsBoxTitle">{props.title}</div>
      <div className="commsBoxText">
        {props.text}
      </div>
    </div>
  );
}

export default CommsBox;