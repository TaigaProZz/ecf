import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminFeedback.scss';
import { AiFillStar } from 'react-icons/ai'

function AdminFeedback () {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3307/api/getfeedback');
      // const feedback = response.data.filter(feedback => feedback.isVerified === 0);
      const feedback = response.data;
      setFeedback(feedback);
    }
    fetchData();
  }, []);

  return(
    <div className="admin-feedback-container">
      <div className="admin-feedback">
        <div className='admin-feedback-categorie-row'>
          <span className='admin-feedback-categorie-element'>Nom</span>
          <span className='admin-feedback-categorie-element'>Message</span>
          <span className='admin-feedback-categorie-element'>Note</span>
          <span className='admin-feedback-categorie-element'>Est Vérifié</span>
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
                    ? <span className='admin-feedback-list-element'><button className="admin-feedback-list-button">Supprimer</button></span> 
                    : <span className='admin-feedback-list-element'><button className="admin-feedback-list-button">Valider</button></span> }
              </div> 
            )
          })}  
        </div>          
      </div>
    </div>  
  ) 
}

export default AdminFeedback;