import './AdminFeedback.scss';
import { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai'
import axios from 'axios';
import ValidatePopUp from '../AdminComponents/PopUp/ValidatePopUp';


function AdminFeedback () {
  const [feedback, setFeedback] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // get all feedbacks 
  const fetchData = async () => {
    const response = await axios.get('http://localhost:3307/api/getfeedback');
    // const feedback = response.data.filter(feedback => feedback.isVerified === 0);
    const feedback = response.data;
    setFeedback(feedback);
  }
  useEffect(() => {
    fetchData();
  }, []);


  const handleButtonClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = async (choice, feedbackId) => {
    if (choice === 'valider') {
      console.log(feedbackId);
      await axios.put(`http://localhost:3307/api/validatefeedback/${feedbackId}`);
      fetchData();
    }
    setShowConfirmation(false);
  };

  // sort list, set non verified feedback first
  const sortedFeedback = () => {
    const sortedList = [...feedback];
    sortByVerified(sortedList);
    setFeedback(sortedList);
  }

  return(
    <div className="admin-feedback-container">
      <div className="admin-feedback">
        <div className='admin-feedback-categorie-row'>
          <span className='admin-feedback-categorie-element'>Nom</span>
          <span className='admin-feedback-categorie-element'>Message</span>
          <span className='admin-feedback-categorie-element'>Note</span>
          <span className='admin-feedback-categorie-element' onClick={sortedFeedback}>Est Vérifié</span>
          <span className='admin-feedback-categorie-element'>Valider</span>
        </div>
        <div className="admin-feedback-list">
          { feedback.map((feedback, index) => { 
            return (
              <div key={index} className='admin-feedback-list-row'>
                <span className='admin-feedback-list-element'>{feedback.name}</span>
                <span className='admin-feedback-list-element'>{feedback.message}</span>
                <span className='admin-feedback-list-element'>{feedback.rating} <AiFillStar /></span>
                <span className='admin-feedback-list-element'>
                  { feedback.isVerified === 0 ? 'Non' : 'Oui' }
                </span>
                { feedback.isVerified === 0 
                  ? <span className='admin-feedback-list-element'>
                      <ValidatePopUp 
                        btn={<button className="admin-feedback-list-button">Valider</button>} 
                        onConfirmation={(choice) => {handleConfirmation(choice, feedback.id)}} 
                        txt={"valider"}
                        handleButtonClick={showConfirmation}
                        /> </span> 
                  : <span className='admin-feedback-list-element'>
                      <ValidatePopUp 
                        btn={<button className="admin-feedback-list-button">Supprimer</button>} 
                        onConfirmation={(choice) => {handleConfirmation(choice, feedback.id)}} 
                        txt={"supprimer"}
                        handleButtonClick={showConfirmation}
                        /> </span> 
                }
              </div> 
            )
          })}  
        </div>          
      </div>
    </div>  
  ) 
}

function sortByVerified(list) {
  list.sort(function(a, b) {
    if (a.isVerified === 0 && b.isVerified === 1) {
      return -1;
    } else if (a.isVerified === 1 && b.isVerified === 0) {
      return 1;
    } else {
      return 0;
    }
  });
}

export default AdminFeedback;