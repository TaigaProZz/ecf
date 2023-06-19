import './Contact.scss';
import { useRef } from 'react';
import axios from 'axios';

function Contact() {
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const msgInputRef = useRef(null);
  const form = useRef(null);

  // function to send message to db
  const sendData = async (name, phone, email, message) => {
    try {
      await axios.post("http://localhost:3307/api/postcontact", {
        subject: 'Contact',
        name: name,
        phone: phone,
        email: email,
        message: message
      });
    } catch (error) {
      console.log(error);
    }
  };

  // check every input and send message to db
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
      const name = nameInputRef.current.value;
      const phone = phoneInputRef.current.value;
      const email = emailInputRef.current.value;
      const message = msgInputRef.current.value;
      // envoyer le message en bdd
      sendData(name, phone, email, message);
      // form.current.reset();
      alert('Votre message a bien été envoyé');
    }  
  }

  return (
    <div className="container center">
      <div ref={form} className='form'>
        <h1 className='center'>Formulaire de contact</h1>
        <div className='name-row row'>
          <p>Nom prénom :</p>
          <input ref={nameInputRef} className='center' placeholder='Entrez votre nom prénom'></input>
        </div>
        <div className='phone-row row'>
          <p>Téléphone :</p>
          <input ref={phoneInputRef} placeholder='Entrez votre numéro de téléphone'></input>
        </div>
        <div className='email-row row'>
          <p>Email :</p>
          <input ref={emailInputRef} placeholder='Entrez votre email'></input>
        </div>
        <div className='msg-row row'>
          <p>Message:</p>
          <textarea ref={msgInputRef} className='msg-input' placeholder='Entrez votre message'></textarea>
        </div>
        <div className='center'>
          <button className='home-button' type="submit" onClick={submit}>Envoyer</button>
        </div>
      </div>  
    </div>
  );
}

export default Contact;