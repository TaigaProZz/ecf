import './Contact.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
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
      await axios.post(`${process.env.REACT_APP_API}/contact`, {
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
      toast.warn('Veuillez remplir tous les champs');
    } else {
      const name = nameInputRef.current.value;
      const phone = phoneInputRef.current.value;
      const email = emailInputRef.current.value;
      const message = msgInputRef.current.value;
      // envoyer le message en bdd
      sendData(name, phone, email, message);
      form.current.reset();
      toast.success('Votre message a bien été envoyé');
    }  
  }

  return (
    <div className="contact-container">
      <form ref={form} className='contact-form'>
        <h1 className='form-title'>Formulaire de contact</h1>
        <div className='name-row row'>
          <label>Nom prénom :</label>
          <input ref={nameInputRef} type='text' className='center' placeholder='Entrez votre nom prénom'></input>
        </div>
        <div className='phone-row row'>
          <label>Téléphone :</label>
          <input ref={phoneInputRef} type='tel' placeholder='Entrez votre numéro de téléphone'></input>
        </div>
        <div className='email-row row'>
          <label>Email :</label>
          <input ref={emailInputRef} type='email' placeholder='Entrez votre email'></input>
        </div>
        <div className='msg-row row'>
          <label>Message:</label>
          <textarea ref={msgInputRef} type='text' className='msg-input' placeholder='Entrez votre message'></textarea>
        </div>
        <div className='contact-sendbtn-container'>
          <button className='home-button' onClick={submit}>Envoyer</button>
        </div>
      </form> 
      <ToastContainer 
        position='bottom-right'
        theme='dark'
      /> 
    </div>
  );
}

export default Contact;