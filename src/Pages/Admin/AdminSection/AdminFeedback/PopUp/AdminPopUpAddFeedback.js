import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './AdminPopUpAddFeedback.scss';

function PopUpAddFeedback(props) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');

  // handle inputs change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // handle add feedback
  const handleFeedback = () => {
    const newFeedback = {
      name,
      rating,
      message,
      isVerified: 1
    };
    props.onAddFeedback(newFeedback);
  };

  return (
    <Popup trigger={props.btn} modal nested>
      {close => (
        <div className="add-feedback-modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">{props.type}</div>
          <div className="content">
            <span>Nom prénom</span>
            <input 
              type="text" 
              value={name}
              onChange={handleNameChange}
            />
            <span>Note ( entre 1 et 5 )</span>
            <input 
              type="number"
              min={1} 
              max={5}
              value={rating}
              onChange={handleRatingChange}
            />
             <span>Message</span>
            <input 
              type="text" 
              value={message}
              onChange={handleMessageChange}
            />
          </div>
          <div className="actions">  
            <button className="button" onClick={handleFeedback}>Ajouter</button> 
          </div>
        </div>
      )}
  </Popup>
  )
}

export default PopUpAddFeedback;