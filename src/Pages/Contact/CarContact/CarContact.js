import '../Contact.scss';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { CARS } from '../../../Data/cars.js'

function Contact() {
  const params = useParams();
  const element = CARS.find(elt => elt.id === params.id);
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
      <form ref={form} className='form'>
        <h1 className='center'>Formulaire de contact</h1>
        <div className='name-row row'>
          <p>Nom prénom :</p>
          <input ref={nameInputRef} className='center' type='text'></input>
        </div>
        <div className='phone-row row'>
          <p>Téléphone :</p>
          <input ref={phoneInputRef} type="tel" required pattern="[0-9]{10}"></input>
        </div>
        <div className='email-row row'>
          <p>Email :</p>
          <input ref={emailInputRef} type='email'></input>
        </div>
        <div className='subject-row row'>
          <p>Voiture:</p>
          <textarea disabled ref={msgInputRef} placeholder={element.title + ' réf: ' + element.id}></textarea>
        </div>
        <div className='msg-row row'>
          <p>Message:</p>
          <textarea ref={msgInputRef}></textarea>
        </div>
        <div className='center'>
          <button className='home-button' type='submit' onClick={submit}>Envoyer</button>
        </div>
      </form>  
    </div>
  );
}

export default Contact;