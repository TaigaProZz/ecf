import './SendFeedback.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useRef, useState } from 'react';
import axios from 'axios';

function SendFeedback() {
  const inputNameRef = useRef(null);
  const inputMessageRef = useRef(null);
  const form = useRef(null);
  const [rating, setRating] = useState(null);

  // function to send feedback  to db
  const sendData = async (name, message, rating, isVerified) => {
    try {
      await toast.promise(
        axios.post(`${process.env.REACT_APP_API}/feedback`, {
          name: name,
          message: message,
          rating: rating,
          isVerified: isVerified
        }),
        {
          pending: 'Envoi du commentaire...',
          success: 
          { 
            render({ data }) {
            setRating(null);
            return "Merci pour votre commentaire ! Il sera publié après modération"
            }
          },
          error: 'Une erreur est survenue'
        }
      )      
    } catch (error) {
      console.log(error);
    }
  }

  const submit = (e) => {
    e.preventDefault();
    if (
      inputNameRef.current.value === '' ||
      inputMessageRef.current.value === '' ||
      rating == null
    ) {
      toast.warn("Veuillez remplir tous les champs");
    } else {
      // integrer l'envoi du commentaire dans "commentaire à moderer"
      const name = inputNameRef.current.value;
      const message = inputMessageRef.current.value
      form.current.reset();
      sendData(name, message, rating, 0);
    }
  }

  function renderStars(selectedRating) {
    const maxRating = 5;
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      const starIcon = i <= selectedRating ? (
        <AiFillStar onClick={() => setRating(i)} />
      ) : (
        <AiOutlineStar onClick={() => setRating(i)} />
      );    
      stars.push(<span key={i} className="star">{starIcon}</span>);
    }
    return stars;
  }

  return (
    <div className="box">
      <form ref={form}>
        <h2>Envoyez nous un commentaire !</h2>
        <div className='send-feedback-row'>
          <label htmlFor="name">Nom :</label>
          <input ref={inputNameRef} type='text' className='inputName' placeholder="Votre nom"></input>
        </div>
        
        <div className='send-feedback-row'>
          <label htmlFor="message">Message :</label>
          <input ref={inputMessageRef} type='text' className='inputMessage' placeholder="Votre message"></input>
        </div>

        <div className='send-feedback-row'>
          <div className="inputRadio">
            <div>Note :</div>
            <div className="rating">
              {renderStars(rating)}
            </div>
          </div>
        </div> 
        <div className='center'>
            <button className='home-button' onClick={submit}>Envoyer</button>
          </div>  
      </form>
    </div>
  );
};

export default SendFeedback;