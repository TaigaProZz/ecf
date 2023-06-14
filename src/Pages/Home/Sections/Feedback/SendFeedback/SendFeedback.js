import React, { useState } from 'react';
import './SendFeedback.scss';

const SendFeedback = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ajoutez ici le code pour soumettre le commentaire
    console.log('Nom:', name);
    console.log('Message:', message);
    console.log('Note:', rating);
    // Réinitialiser les valeurs
    setName('');
    setMessage('');
    setRating(0);
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit} className=''>
        <div className="form-group inputBox">
          <label htmlFor="name">Nom :</label>
          <input type="text" id="name" name="name" className='inputName' value={name} onChange={handleNameChange} placeholder="Votre nom" required />
        </div>
        <div className="form-group inputBox">
          <label htmlFor="message">Message :</label>
          <input id="message" name="message" className='inputMessage' value={message} onChange={handleMessageChange} placeholder="Votre message" required></input>
        </div>
        <div className='center'>
          <div className="form-group inputRadio">
            <label htmlFor="rating">Note :</label>
            <div className="rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value}>
                  <input type="radio" name="rating" value={value} checked={rating === value} onChange={handleRatingChange} />
                  <span className="star"></span>
                </label>
              ))}
            </div>
          </div>
          <div >
              <button className='btn'>Envoyer</button>
            </div>
        </div>
        
      </form>
    </div>
  );
};

export default SendFeedback;