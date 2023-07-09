import './AdminFeedback.scss';
import ValidatePopUp from '../AdminComponents/PopUp/ValidatePopUp';
import { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsPlusSquare } from 'react-icons/bs';
import PopUpAddFeedback from './PopUp/AdminPopUpAddFeedback'
import axios from 'axios';

function AdminFeedback () {
  const [feedback, setFeedback] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // get all feedbacks 
  const fetchData = async () => {
    try {
      const response = await axios.get('https://ecf-node-serv.vercel.app:3307/feedback');
      const feedback = response.data;
      setFeedback(feedback);
    } catch (error) {
      console.log(error);
    } 
  }
  useEffect(() => {
    fetchData();
  }, []);

  // set feedback to validate
  const handleValidate = async (choice, feedbackId) => {
    if (choice === 'valider') {
      try {
        await axios.put(`https://ecf-node-serv.vercel.app:3307/feedback/${feedbackId}`, {isVerified: 1}); 
        fetchData();
        alert('Feedback validé')
      } catch (error) {
        alert("Erreur lors de l'envoi des données", error);
      }
      // close popup
      setShowConfirmation(false);
    }
  };
  // set feedback to hiden
  const handleHide = async (choice, feedbackId) => {
    if (choice === 'valider') {
      try {
        await axios.put(`https://ecf-node-serv.vercel.app:3307/feedback/${feedbackId}`, {isVerified: 0});
        fetchData();
        alert('Feedback caché')
      } catch (error) {
        alert("Erreur lors de l'envoi des données", error);
      }
      // close popup
      setShowConfirmation(false);
    }
  };

  // delete feedback from db
  const handleDelete = async (choice, feedbackId) => {
    if (choice === 'valider') {
      try {
        await axios.delete(`https://ecf-node-serv.vercel.app:3307/feedback/${feedbackId}`);
        fetchData();
        alert('Feedback supprimé')
      } catch (error) {
        alert('Erreur lors de la suppression', error);
      }
    }
  }

  // sort list, set non verified feedback first
  const sortedFeedback = () => {
    const sortedList = [...feedback];
    sortByVerified(sortedList);
    setFeedback(sortedList);
  }

  // add feedback to db
  const addFeedback = async (newFeedback) => {
    // check if feedback's inputs are empty
    if(newFeedback.name === '' || newFeedback.rating === '' || newFeedback.message === '') {
      alert('Veuillez remplir tous les champs');
      return;
    }
    // request to add to db
    try {
      await axios.post(`https://ecf-node-serv.vercel.app:3307/feedback`, newFeedback);
      alert('Feedback ajouté')
      // refresh list
      fetchData();
    } catch (error) {
      alert("Erreur lors de l'ajout", error)
    }
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
                  ? <div className='admin-feedback-validate-container'>
                      <ValidatePopUp 
                        btn={<button className="admin-feedback-list-button">Valider</button>} 
                        onConfirmation={(choice) => {handleValidate(choice, feedback.id)}} 
                        txt={"valider"}
                        handleButtonClick={showConfirmation}
                      />
                      <ValidatePopUp  
                        btn={<button className="admin-feedback-list-button">Supprimer</button>} 
                        onConfirmation={(choice) => {handleDelete(choice, feedback.id)}} 
                        txt={"supprimer"}
                        handleButtonClick={showConfirmation}
                      /> 
                    </div> 
                  :
                  <div className='admin-feedback-validate-container'>
                      <ValidatePopUp  
                        btn={<button className="admin-feedback-list-button">Cacher</button>} 
                        onConfirmation={(choice) => {handleHide(choice, feedback.id)}} 
                        txt={"cacher"}
                        handleButtonClick={showConfirmation}
                      /> 
                      <ValidatePopUp  
                        btn={<button className="admin-feedback-list-button">Supprimer</button>} 
                        onConfirmation={(choice) => {handleDelete(choice, feedback.id)}} 
                        txt={"supprimer"}
                        handleButtonClick={showConfirmation}
                      /> 
                  </div>   
                }
              </div> 
            )
          })}  
        </div> 
      </div>
      <PopUpAddFeedback
        btn={<button className='admin-add-btn'>Ajouter un commentaire <BsPlusSquare size={30} /></button>}
        type='Ajouter un feedback'
        onAddFeedback={addFeedback}
        >
      </PopUpAddFeedback>         
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