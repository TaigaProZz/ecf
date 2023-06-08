// print a box to display the user's comments
import React from 'react';
import { Card } from 'react-bootstrap';
import './CommsBox.scss';

function CommsBox(props) {
  return (
    <Card className="commsBox">
      <Card.Body>
        <Card.Title className="commsBoxTitle">{props.title}</Card.Title>
        <Card.Text className="commsBoxText">
          {props.text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CommsBox;