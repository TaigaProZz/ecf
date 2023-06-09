import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';

function ValidatePopUp({btn, onConfirmation, txt}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChoice = (choice) => {
    onConfirmation(choice);
    handleClose();
  };;

  return (
    <Popup trigger={btn} modal open={open} onOpen={handleOpen} onClose={handleClose}>
      {close => (
        <div className="admin-popup-modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className='header'>
            { txt === "supprimer"
              ?  <p>Êtes-vous sûr de vouloir {txt}? Cette action est irréversible</p>
              :  <p>Êtes-vous sûr de vouloir {txt} ?</p>
            }
          </div>
          <div className='actions'>
            <button onClick={() => handleChoice('valider')}>Valider</button>
            <button onClick={() => handleChoice('annuler')}>Annuler</button>
          </div>
        </div>
      )}
    </Popup>
      
  );
}

export default ValidatePopUp;