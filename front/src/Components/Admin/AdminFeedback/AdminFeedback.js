import 'react-toastify/dist/ReactToastify.css';
import PopUpAddFeedback from '../AdminComponents/PopUp/FeedbackAdd';
import ValidatePopUp from '../AdminComponents/PopUp/ValidatePopUp';
import { BsPlusSquare } from 'react-icons/bs';
import { IoTrashBinOutline } from 'react-icons/io5';
import { BiHide } from 'react-icons/bi';
import { BsPatchCheck } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminFeedback () {
  const [feedback, setFeedback] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // get all feedbacks 
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/feedback`);
      const feedback = response.data;
      setFeedback(feedback);
    } catch (error) {
      toast.error("Erreur lors de la récupération des données", error)
    } 
  }
  useEffect(() => {
    fetchData();
  }, []);

  // set feedback to validate
  const handleValidate = async (choice, feedbackId) => {
    if (choice === 'valider') {
      try {
        await toast.promise (
          axios.put(`${process.env.REACT_APP_API}/feedback/${feedbackId}`, {isVerified: 1}),
          {
            pending: 'Envoi des données...',
            success: {
              render({ data }) {
                fetchData();
                return 'Feedback validé avec succès !';
              }
            },
            error: {
              render({ data }) {
                return `Erreur lors de l'envoi des données : ${data}`;
              }
            }
          }
        )
      } catch (error) {
        toast.error("Erreur lors de l'envoi des données", error);
      }
      // close popup
      setShowConfirmation(false);
    }
  };
  // set feedback to hiden
  const handleHide = async (choice, feedbackId) => {
    if (choice === 'valider') {
      try {
        await toast.promise (
          axios.put(`${process.env.REACT_APP_API}/feedback/${feedbackId}`, {isVerified: 0}),
          {
            pending: 'Envoi des données...',
            success: {
              render({ data }) {
                fetchData();
                return 'Feedback caché avec succès !';
              }
            },
            error: {
              render({ data }) {
                return `Erreur lors de l'envoi des données : ${data}`;
              }
            }
          }
        )
      } catch (error) {
        toast.error("Erreur lors de l'envoi des données", error);
      }
      // close popup
      setShowConfirmation(false);
    }
  };

  // delete feedback from db
  const handleDelete = async (choice, feedbackId) => {
    if (choice === 'valider') {
      try {
        await toast.promise (
          axios.delete(`${process.env.REACT_APP_API}/feedback/${feedbackId}`),
          {
            pending: 'Envoi des données...',
            success: {
              render({ data }) {
                fetchData();
                return 'Feedback supprimé avec succès !';
              }
            },
            error: {
              render({ data }) {
                return `Erreur lors de l'envoi des données : ${data}`;
              }
            }
          }
        )
      } catch (error) {
        toast.error('Erreur lors de la suppression', error);
      }
    }
  }

  // add feedback to db
  const addFeedback = async (newFeedback) => {
    // check if feedback's inputs are empty
    if(newFeedback.name.trim() === '' || newFeedback.rating.trim() === '' || newFeedback.message.trim() === '') {
      toast.warn('Veuillez remplir tous les champs');
      return;
    }
    // request to add to db
    try {
      await toast.promise (
        axios.post(`${process.env.REACT_APP_API}/feedback`, newFeedback),
        {
          pending: 'Envoi des données...',
          success: {
            render({ data }) {
              fetchData();
              return 'Feedback ajouté avec succès !';
            }
          },
          error: {
            render({ data }) {
              return `Erreur lors de l'envoi des données : ${data}`;
            }
          }
        }
      )
    } catch (error) {
      toast.error("Erreur lors de l'ajout", error)
    }
  }
  
  // sort list, set non verified feedback first
  const sortedFeedback = () => {
    const sortedList = [...feedback];
    sortByVerified(sortedList);
    setFeedback(sortedList);
  }

  return(
    <>
      {/* add button */}	
      <header className='admin-header'>
        <PopUpAddFeedback
          btn={<button className='admin-button-add'>Ajouter un commentaire <BsPlusSquare size={30} /></button>}
          type='Ajouter un feedback'
          onAddFeedback={addFeedback}
        />  
      </header>

      {/* content table */}	
      <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Message</th>
            <th>Note</th>
            <th onClick={sortedFeedback}>Est vérifié</th>
            <th>Gérer</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((elt) => {
            return (
              <tr key={elt.id}>
                <td>{elt.name}</td>
                {/* split message to display it on multiple lines */}
                <td>{elt.message}</td>
                <td>{elt.rating}</td>
                <td>{elt.isVerified === 0 ? 'Non' : 'Oui'}</td>
                <td>
                  { elt.isVerified === 0 ?
                    <ValidatePopUp 
                      btn={<button className='admin-table-btn'><BsPatchCheck size={24} /></button>} 
                      onConfirmation={(choice) => {handleValidate(choice, elt.id)}} 
                      txt={"valider"}
                      handleButtonClick={showConfirmation}
                    /> :
                    <ValidatePopUp  
                      btn={<button className='admin-table-btn'><BiHide size={24} /></button>} 
                      onConfirmation={(choice) => {handleHide(choice, elt.id)}} 
                      txt={"cacher"}
                      handleButtonClick={showConfirmation}
                    /> 
                  }
                </td>
                <td>
                  <ValidatePopUp  
                    btn={<button className='admin-table-btn'><IoTrashBinOutline size={24} /></button>} 
                    onConfirmation={(choice) => {handleDelete(choice, elt.id)}} 
                    txt={"supprimer"}
                    handleButtonClick={showConfirmation}
                  /> 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div> 
    </>

   
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