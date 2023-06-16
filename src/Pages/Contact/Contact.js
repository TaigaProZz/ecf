import './Contact.scss';
import { useRef } from 'react';

function Contact() {
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const msgInputRef = useRef(null);
  const form = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    if (
      nameInputRef.current.value === '' ||
      phoneInputRef.current.value === '' ||
      emailInputRef.current.value === '' ||
      msgInputRef.current.value === ''
    ) {
      alert('Veuillez remplir tous les champs');
    } else {
      // envoyer le message en bdd
      form.current.reset();
      alert('Votre message a bien été envoyé');
    }
  }


  return (
    <div className="container center">
      <div className='form'>
        <h1 className='center'>Formulaire de contact</h1>
        <div className='name-row row'>
          <p>Nom prénom :</p>
          <input id='name-input' className='center' placeholder='Entrez votre nom prénom'></input>
        </div>
        <div className='phone-row row'>
          <p>Téléphone :</p>
          <input id='phone-input' placeholder='Entrez votre numéro de téléphone'></input>
        </div>
        <div className='email-row row'>
          <p>Email :</p>
          <input id='email-input' placeholder='Entrez votre email'></input>
        </div>
        <div className='msg-row row'>
          <p>Message:</p>
          <textarea id='msg-input' placeholder='Entrez votre message'></textarea>
        </div>
        <div className='center'>
          <button className='home-button' type="submit" onClick={submit}>Envoyer</button>
        </div>
      </div>  
    </div>
  );
}

export default Contact;